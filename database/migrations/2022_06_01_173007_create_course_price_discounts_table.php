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
            $table->string('name', 63);
            $table->string('activation_code', 63);
            $table->string('title', 255);
            $table->integer('course_price_id')->unsigned()->nullable();
            $table->integer('user_id')->unsigned()->nullable();
            $table->integer('discount_percent')->unsigned()->nullable();
            $table->integer('discount_amount')->unsigned()->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->dateTime('activated_at')->nullable();
            $table->timestamps();

            $table->foreign('course_price_id')->references('id')->on('course_prices')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
