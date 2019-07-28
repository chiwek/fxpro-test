<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $set_schema_table = 'clients';

    /**
     * Run the migrations.
     * @table clients
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable($this->set_schema_table)) return;
        Schema::create($this->set_schema_table, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->unsignedInteger('product_id')->nullable();
            $table->string('firstname', 45);
            $table->string('lastname', 45);
            $table->string('email', 120);
            $table->string('phone', 45)->nullable();
            $table->string('cellphone', 45)->nullable();
            $table->text('note')->nullable();
            $table->boolean('is_active')->default('0');

            $table->index(["product_id"], 'i_client_product');
            $table->timestamps();


            $table->foreign('product_id', 'fk_client_product')
                ->references('id')->on('products')
                ->onDelete('set null')
                ->onUpdate('set null');
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
