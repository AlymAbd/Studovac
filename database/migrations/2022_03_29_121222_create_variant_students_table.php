<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVariantStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('variant_students', function (Blueprint $table) {
            $table->id();
            $table->integer('exam_variant_id')->unsigned();
            $table->integer('student_id')->unsigned();
            $table->integer('checking_teacher_id')->unsigned();
            $table->dateTimeTz('started_at')->unsigned();
            $table->dateTimeTz('finished_at')->unsigned();
            $table->timestamps();

            $table->foreign('exam_variant_id')->on('variants')->references('id');
            $table->foreign('student_id')->on('users')->references('id');
            $table->foreign('checking_teacher_id')->on('users')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('variant_students');
    }
}
