<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionAgreementTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction_agreement', function (Blueprint $table) {
            $table->id();
            $table->string('name', 63);
            $table->string('reference')->nullable();
            $table->boolean('is_paid')->default(false);
            $table->decimal('initial_amount', 127, 2)->unsigned();
            $table->decimal('final_amount', 127, 2)->unsigned();
            $table->integer('agreement_teacher_id')->unsigned();
            $table->timestamps();

            $table->foreign('agreement_teacher_id')->references('id')->on('agreements_user');
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
