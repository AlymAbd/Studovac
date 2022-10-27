<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction_users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 63);
            $table->string('reference')->nullable();
            $table->boolean('is_paid')->default(false);
            $table->decimal('initial_amount', 127, 2)->unsigned();
            $table->decimal('final_amount', 127, 2)->unsigned();

            // Foreign keys
            $table->integer('price_id')->unsigned()->nullable();
            $table->integer('discount_id')->unsigned()->nullable();
            $table->integer('order_id')->unsigned()->nullable();
            $table->integer('user_id')->unsigned();

            $table->string('status')->default('pending');
            $table->string('response', 1023)->nullable();
            $table->string('payment_system', 255);
            $table->dateTimeTz('paid_at');
            $table->timestamps();

            $table->foreign('price_id')->references('id')->on('course_prices')->onDelete('cascade');
            $table->foreign('discount_id')->references('id')->on('course_price_discounts')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
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
        Schema::dropIfExists('transactions');
    }
}
