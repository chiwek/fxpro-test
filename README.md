
# FxPro Test App

## Structure

Both front and backend are bundled into single repository

All of Laravel Code is added into FxPro Namespace under App

Angular is using routing, models, modules, services, and directives.


## ISSUES

Found some problems with the task definition itself, so msome things are probably not done as you intended them.

###### Entities
You say Client can be related to a product, and then ask for Administrator to see all clients with their products. 
It's not clear is the client-product entities relation 1:1 or 1:N, I did 1:1, went the easier way ;)

###### Users
You address User types as Administrator and Regular, but then say 'System Users' will be responsible to CRUD Clients and Products.
Which type are system users? I simply discarded this as a rhetorical statement. 


###### Action Logs
I did not build UI to display Action Logs, but I have started the backend.

Action logs exist in this App, but only in the database. The functionality done is only for Create/Update as Delete is a bit complicated due to records not really being deleted. I didn't like adding code directly to controllers for it, and building a wrapper would be out of scope as it would push me out of the deadline to give the test in.

 
    
## DEMO

You can see the app in action here:

http://fxpro.codebliss.biz/v1 

## Deployment

Deployment is done with Deployer(deployer/deployer) package
If familiar with it, you can deploy easily to your server with modifying deploy.php in the app home.

## Host on your servers 
### Requirements

- Apache 2
- Php 7.2 or newer
- Mysql 8 or newer (Has JSON column support)
- Composer
- Node with NPM installed
- Angular CLI 7

### Installation

#### Backend
Clone the app into a working folder on your web server.

Create your database and database user in MySQL.
 
cd into the cloned app home. 

Execute:
> composer install

Copy production environment with:
> cp environment/production.env .env

Modify newly created .env file to correct database access params and your App URL.

Then Execute:
> php artisan migrate --seed

Serve content with apache from public folder.

Make sure your file permissions are open to write for apache group recursively for storage folder.

#### Frontend
cd into angular folder

Execute:
> npm install

Modify src/environments/environment.prod.ts to correct API url and Frontend URI, 
if it's going to sit in a subfolder state it as base href parameter below

Execute:
> ng build --prod --base-href=/v1/

Copy contents of dist/angular folder to where you'll be serving the Frontend App and under Frontend URI


#### Shortcut

You can serve frontend from anywhere, even localhost, it will still work with already working API under fxpro.codebliss.biz.

API has full CORS enabled for this particular need exactly. 







