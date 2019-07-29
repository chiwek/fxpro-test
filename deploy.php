<?php
namespace Deployer;

require 'recipe/laravel.php';

// Configuration

set('repository', 'https://github.com/chiwek/fxpro-test.git');
//set('git_tty', true); // [Optional] Allocate tty for git on first deployment
if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    set('git_tty', false);
    set('ssh_multiplexing', false);
}

set('env_file', 'local');

add('shared_files', []);
set('shared_dirs', ['public/uploads', 'storage/app', 'storage/framework', 'storage/logs']);


set('writable_dirs', ['storage', 'vendor', 'public/uploads']);


// Hosts

host('production')
    ->hostname('116.203.94.213')
    ->stage('production')
    ->set('branch', 'master')
    ->user('webfxpro')
    ->identityFile('~/.ssh/id_rsa_no_pwd')
    ->set('deploy_path', '/home/webfxpro')
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



task('artisan:config:clear', function () {

    run("cd {{release_path}} && php artisan config:clear");
})->desc('Environment setup');

task('shell:change', function() {
    run('chsh -s /bin/bash');
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
