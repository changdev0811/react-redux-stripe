const express = require('express');
nodeMailer = require('nodemailer');

const router = express.Router();
const Email = require('../models/Email');

router.post('/send', function (req, res) {

    let transporter = nodeMailer.createTransport({
  
        service: "Gmail",
        auth: {
            user: req.body.user,
            pass: "sender's password"
        },
        tls: {
            rejectUnauthorized: true
        }
    });

    let mailOptions = {
        from: req.body.user, // sender address
        to: 'your server address',
        subject: "Report",
        text: "",
        html: req.body.html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
    });

    //     var email = new Email(req.body);
    //     email.save(function(err){
    //           if(err){
    //               res.status(500).json({ code:'500',message:'fail',error: err });
    //           } else {
    //               res.status(201).json({ code:'201',message:'success - Email Sented',data:req.body });
    //           }
    //       });
});


module.exports = router;
