
# FxPro Test App

## Structure

Both front and backend are bundled into single repository

All of Laravel Code is added into FxPro Namespace under App

Angular is using routing, models, modules, services, and directives.


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







