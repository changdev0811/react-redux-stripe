# react-redux-project

1. Accessing to EC2 instance via putty.

Using puttygen, convert *.pem to *.ppk.
In putty, it is used as auth key.
(I think you will know how to use putty.)

2. Pushing project folder to instance.

Go to certain folder.
Type the url as the following:

>> git clone https://github.com/soludents/react-redux-project.git

In the project folder, there are two directories: frontend and backend.

3. Setting up environment

- Installing node.js

Run the following command:

>>curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
>>sudo apt-get install -y nodejs

You may check node.js and npm version:

>> node.js -v
>> npm -v

- Installing mongodb

Refer this url:
https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04

- Setting up global node package for backend service.

In certain directory

>> npm install -g forever

- Setting up npm modules in project folder.

Go to the folder "frontend" in project root.

>> npm install

And go to the folder "backend" in project root.

>> npm install

4. Running backend and frontend projects.

Go to the folder "frontend" in project root.

>> npm start&

And go to the folder "backend" in project root.

>> forever start app.js

5. Configuring and running proxy server "nginx" for frontend.

To setup, configure and run nginx to instance, refer this url.

https://www.rosehosting.com/blog/how-to-install-nginx-on-ubuntu-16-04/

*************

You may check currently running ports.

>> netstat -tuplen

Maybe backend is running on port 5000, frontend is running on port 3000, nginx is running on port 80 and mongodb is running on port 27017.

Now that all services are running, you may reconfigure nginx config.

In certain directory

>> nano /etc/nginx/sites-available/default

You may open the file.

There, you must place as the following:

server {
    listen 80;
    server_name 18.202.179.5;
    root /opt/react-redux-project;

    location / {
        include proxy_params;
        proxy_pass http://localhost:3000;
    }
...
}

This will have request redirect from clients to "localhost:3000" , react project when users requests http://18.202.179.5/

If you want to contact me, please email to anywhere0811@gmail.com.
At the same time, this is my skype address.

