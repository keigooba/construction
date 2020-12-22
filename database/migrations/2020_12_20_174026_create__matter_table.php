<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatterTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matters', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',255);
            $table->string('sub',255)->nullable();
            $table->string('sub2',255)->nullable();
            $table->string('sales',50)->nullable();
            $table->string('designer',50)->nullable();
            $table->string('constructor',50)->nullable();
            $table->string('trader',50)->nullable();
            $table->integer('contract')->nullable();
            $table->date('date');
            $table->string('note',255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('matters');
    }
}
