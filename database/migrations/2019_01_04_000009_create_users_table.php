<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $set_schema_table = 'users';

    /**
     * Run the migrations.
     * @table users
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable($this->set_schema_table)) return;
        Schema::create($this->set_schema_table, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->unsignedInteger('role_id');
            $table->string('firstname', 45);
            $table->string('lastname', 45);
            $table->string('email', 120);
            $table->string('username', 45);
            $table->string('password', 80);
            $table->string('remember_token', 120);
            $table->string('phone', 45)->nullable();
            $table->string('cellphone', 45)->nullable();
            $table->text('note')->nullable();
            $table->dateTime('date_registered');
            $table->dateTime('date_activated')->nullable();
            $table->boolean('is_active')->default('0');

            $table->dateTime('date_login')->nullable();

            $table->index(["role_id"], 'i_user_role');
            $table->timestamps();

            $table->foreign('role_id', 'fk_user_role')
                ->references('id')->on('roles')
                ->onDelete('no action')
                ->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
     public function down()
     {
       Schema::dropIfExists($this->set_schema_table);
     }
}
