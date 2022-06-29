<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction_courses', function (Blueprint $table) {
            $table->id();
            $table->string('unique_name', 63);
            $table->integer('course_order_id')->unsigned();
            $table->integer('transaction_id')->unsigned();
            $table->boolean('is_paid')->default(false);
            $table->enum('type', ['incoming', 'outgoing']);
            $table->string('purpose', 255);
            $table->integer('initiator_id')->unsigned();
            $table->integer('final_receiver_id')->unsigned();
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
        Schema::dropIfExists('transaction_courses');
    }
}
