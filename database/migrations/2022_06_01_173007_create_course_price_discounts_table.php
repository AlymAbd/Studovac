<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursePriceDiscountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('course_price_discounts', function (Blueprint $table) {
            $table->id();
            $table->string('unique_name', 63);
            $table->string('title');
            $table->integer('course_price_id')->unsigned();
            $table->integer('discount_percent')->unsigned()->nullable();
            $table->integer('discount_amount')->unsigned()->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
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
        Schema::dropIfExists('course_price_discounts');
    }
}
