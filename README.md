## DevTinder
- Create a Vite + React application
- Remove unnecessary code and create a Hello World app
- Install Tailwind CSS
- Install Daisy UI
- Add NavBar component to App.jsx
- Create a NavBar.jsx separate Component file
- Install react router dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a footer
- Create a Login Page- 
- Install axios
- CORS - install cors in backend => add middleware to with configurations: orgin, credentials: true
- Whenever you're making API call so pass axios => { withCredentials: true }
- install react-redux + @reduxjs/toolkit - https://redux-toolkit.js.org/tutorials/quick-start
- configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout Feature
- Get the feed and add the feed in th store
- build the user card on feed
- Edit profile Feature
- Show toast message on save of profile
- New Page - See all my connections
- New Page - See all my Conenction REquests
- Feature - Accept/Reject connection request
- Send/Ignore the user card from the feed
- Signup New User
- E2E testing
- Body NavBar Route=/ => Feed Route=/login => Login Route=/connetions => Connections Router=/profile => Profile

# Deployment
- sign up on aws
- "Launch an instance" fill the name example devTinder
- which operating system you want to run from "application and os images" example chhose ubuntu
- "instance type" t2 micro for free tier eligible
- generate "key pair(login)" when click on create new key pair example devTinder-secret,it will generate the devTinder-secret.pem file and that is available in downloads folder
- then click on "launch instances" button
- go to instances then click on "connect",
- then go to connect to instance of SSH client
- then open git bash and go to cd downloads after that chmod 400 <secret>.pem for change the permission,then
- then connect the key with machine address using ssh -i "devTinder-secret.pem" ubuntu@ec2-44-197-186-80.compute-1.amazonaws.com
- Run the Node.js Installation Commands Once connected to your Ubuntu EC2 instance, run:
- point to note local node version same as your Ubuntu EC2 instance node version
- curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
- sudo apt install -y nodejs
- After installation, check the installed versions: node -v
npm -v
- git clone [frontend-project](https://github.com/Trigunananda/devTinder-web.git)/git clone [backend-project](https://github.com/Trigunananda/devTinder.git)
- type ls to see the folder
- cd devTinder-web(frontend)
- npm run build to generate dist folder which is contain the compile code in locally 
- build the project on remote machine of aws example npm run build.but if you use vite then error vite not found
- frontend Deploy
    - so that type npm i for dependency
    - type npm run build
    - type ls contain dist folder to contain all code that which have run on the server of aws
    - nginx it is a free and open-source software,it gives a web server,load balancer,mail proxy,used to host the frontend project
    - If you're on an Ubuntu-based AWS EC2 instance and want to update all installed packages, use the following command:
    - sudo apt update
    - install nginx so type sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist(build files) to /var/www/html/ means cd /var/www/html/
    - copy the dist folder to /var/www/html/,git pull ,npm run build   after that type sudo scp -r dist/* /var/www/html/
    - check the status type cd /var/www/html/ then type ls
    - enable port :80 of your instance
    - after successfully run of the public ip then it map with the domain name so that it is available anywhere with the domain name
- Backend Deploy  
    - updated DB password
    - open git bash
    - cd downloads
    - then connect the key with machine address using ssh -i "devTinder-secret.pem" ubuntu@ec2-44-197-186-80.compute-1.amazonaws.com
    - type ls
    - cd devTinder
    - go to ec2 instance and copy the public ipv4 of ip address
    - go to mongoDB atlas ,then network access click on edit then fill the ip in access List entry then click confirm for white list the ip
    - in devTinder then type npm run start
    - enable to access 7777 port 
    - public ip:7777 on browser
    - there should be a process to run npm run start is always run in the background
    - in devTinder type npm install pm2 -g(Advanced,production process manager for nodeJs)
    - pm2 start npm -- start(new process has been started)
    - pm2 log
    - pm2 flush npm(name of the application) for clear the logs
    - pm2 list
    - pm2 stop npm
    - pm2 delete npm for delete the process
    - npm install
    - pm2 start npm --name "devTinder-backend" -- start for custom the name
    - frontend = http://43.204.96.49
    - backend =  http://43.204.96.49:7777/
    - Domain Name = devtinder.com => 43.204.96.49
    - frontend = devtinder.com
    - backend =  devtinder.com:7777 => devTinder.com/api
    - nginx proxy pass /api to 7777 node application to search in chatgpt
    - cd downloads edit the file in terminals
    - type sudo nano /etc/nginx/
    - type sudo nano /etc/nginx/sites-available/default for default nginx config
    - sudo systemctl restart nginx for restart before execute
    - modify the BASEURL in frontend project to "/api"
    - locally git push
    - remotely git pull

# nginx config:
    - write server_name 43.204.96.49(fill if domain name available else ip )
    - below the server name add in the nginx config i.e -      location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    - save it, exit it 
# Adding a custom domain    
- godaddy for domain name purchase
- signup on cloudflare and add a new domin name
- cloudflare for mapping the domain with ip after update the nameserver
- change the nameservers of godaddy and pointing to cloudflare
- click on check nameservers now in cloudflare
- wait for sometime till your nameservers are updated ~15 minutes
- update the domain name at your registar to activate cloudflare service for this domain
- always add A record in cloudflare
- go to the DNS left hand side of cloudflare and edit the ip
- DNS record: A devTinder.in 43.204.96.49
- go to SSL/TLS then configure custom SSL/TLS choose flexible and save it
- go to Edge certificate and of the Automatic HTTPS Rewrites
# Amazon SES(simple email service)
- search section type IAM
- create user,click users then click on create new user on the top and fill with ses-user,then click on next
- click on attach policies directly,search amazonses and tick on amazonSESfull access,click on next,then click on create user
- user have succefully created
- search amazonses  then click on view get set up page then click on create identity ,click on verify domain name ,we have the domain name devTinder.in,
- verify email address identity
- click on Easy DKIM ,click on RSA_2024_BIT ,clik on DNS and signature enable 
- then click on create identity
- amazon ses has three identifies record with name and value of each
- then go to cloudflire click on DNS then records, add record button, with put the name and value as same of amazon ses,turn off the proxy,CNAME as type
- now aws is verified domain name is configured or not
- verification will take upto 72 hours to complete
- then go to get set up on amazon ses bcuz of request production access
- then fill up the request production access,click on submit
- click on IAM ,users,ses-users ,security credentials then click on create access key ,select other save then click  create access key
- copy the secret and access key and paste in .env file i.e 
AWS_SES_SECRET = "aws secret key" and AWS_ACCESS_KEY = "aws access key"
- then go to aws ses nodejs docs i.e https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html
- click on AWS SDK for JavaScript V3 API Reference
- then go to code example of amazon ses,click on send email for reference https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
- write code for sending email address
- make the email dynamic by passing the more parameter to run the functiom

# Scheduling cron jobs in nodejs
- Installing node-cron
- Learning about cron expressions syntax - crontab.guru
- [crontab.guru](https://crontab.guru/)
- Schedule a job
- date-fns
- Find all the unique  email Id who have got connection Request in previous day
- Send Email
- Explore queue mechanim to send bulk emails
- Amazon SES Bulk Emails
- Make sendEmail function dynamic
- bee-queue & bull npm packages

# Razorpay Payment Gateway Inegration
- Sign up on Razorpay & complete KYC 
- Cerated a UI for premium page
- Creating an API for create order in backend
- added my key and secret in env file
- Intialized Razorpay in utils
- creating order on Razorpay
- create Schema and model
- saved the order in payments collection
- make the API dynamic
- Setup RRazorpay webhook on your live APi
- Ref - https://github.com/razorpay/razorpay-node/tree/master/documents
- Ref - https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#integrate-with-razorpay-payment-gateway
- Ref - https://razorpay.com/docs/webhooks/validate-test/
- Ref - https://razorpay.com/docs/webhooks/payloads/payments/
