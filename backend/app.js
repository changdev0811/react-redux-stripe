const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const path=require("path");

const documents = require('./routes/document'); 
const members = require('./routes/member'); 
const histories = require('./routes/history'); 
const emails = require('./routes/email'); 

//This is stripe mode.
const stripe = require('./models/constants/stripe');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));
app.use('/api/documents', documents);
app.use('/api/members', members);
app.use('/api/histories', histories);
app.use('/api/emails', emails);

app.get('/', function(req, res) {
    res.send('hello');
});

//////////////This is stripe test mode////////////////

app.post('/api/stripe', (req, res) => {
    stripe.charges.create(req.body, postStripeCharge(res));
});

const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
}
//////////////////////////////////////////////////////


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    console.log(`PATH`, path.dirname(require.main.filename));
});