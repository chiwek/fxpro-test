<?php
namespace Deployer;

require 'recipe/laravel.php';

// Configuration

set('repository', 'istanisavljevic@bitbucket.org:codebliss/plant-stats.git');
//set('git_tty', true); // [Optional] Allocate tty for git on first deployment


set('env_file', 'local');

add('shared_files', []);
set('shared_dirs', ['public/uploads', 'storage/app', 'storage/framework', 'storage/logs']);


set('writable_dirs', ['storage', 'vendor', 'public/uploads']);


// Hosts

host('production')
    ->hostname('116.203.94.213')
    ->stage('production')
    ->set('branch', 'master')
    ->user('wplants')
    ->identityFile('~/.ssh/id_rsa')
    ->set('deploy_path', '/home/wplants')
    ->set('env_file', 'production.env')
    ->set('env_angular', 'production')
    ->set('rsync_src', '/home/vagrant/code/_angular/build')
    ->set('rsync_dest','{{release_path}}/_angular/build');

// Tasks
/**
 * Setup the environment file in the new release
 */
task('environment', function () {
    run('cp {{release_path}}/environment/{{env_file}} {{release_path}}/.env');
})->desc('Environment setup');

task('laravel:vendors', function () {
    run('cd {{release_path}} && ');
})->desc('Environment setup');

task('angular:build', function() {
    runLocally('cd D:\wamp\www\paprikart\plant-stats\_angular && ng build --configuration=production --base-href=/v1/');
})->desc('Build Done');

task('angular:copy_htaccess', function () {
    runLocally('cd D:\wamp\www\paprikart\plant-stats\_angular && cp .htaccess dist\angular\.htaccess');
})->desc('Copy HTACCESS');

task('angular:copy_frontend', function () {
    runLocally('cd D:\wamp\www\paprikart\plant-stats\_angular\dist\angular && cp *.* dist\angular\.htaccess');
    run("cd {{release_path}}/_angular/dist/angular && cp * {{release_path}}/public/v1");
})->desc('Copy Frontend');

task('artisan:config:clear', function () {

    run("cd {{release_path}} && php artisan config:clear");
})->desc('Environment setup');

task('shell:change', function() {
    run('chsh -s /bin/bash');
})->desc('Changed Shell');


task('local:build', function() {
    runLocally('cd /home/vagrant/code/_angular && ng build --prod');
})->desc('Changed Shell');


task('version:bump', function() {

})->desc('Version Bumped');

task('deploy', [

    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:vendors',
    'deploy:shared',
    'environment',

    'artisan:storage:link',
    'artisan:view:cache',
    'artisan:config:cache',
    // 'artisan:optimize',
    'artisan:migrate',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',

])->desc('Deploying Plants SUCCESS');



after('deploy', 'success');
