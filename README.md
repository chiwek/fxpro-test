
# FxPro Test App

### Requirements

- Apache 2
- Php 7.2 or newer
- Mysql 8 or newer (Has JSON support)

## Installation


Clone the app into a working folder on your web server.

Create your database and database user in MySQL.
 
cd into the cloned app home. 

Copy production environment with:
> cp environment/production.env .env

Modify newly created .env file to correct database access params and your App URL.

Then Execute:
> php artisan migrate --seed


Serve content with apache from public folder.

Make sure your file permissions are open to apache write recursively for storage folder.

