<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExerciseStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exercise_answers', function (Blueprint $table) {
            $table->id();
            $table->integer('student_id')->unsigned();
            $table->integer('excercise_variant_id')->unsigned();
            $table->text('string_answer');
            $table->text('teacher_comment');
            $table->decimal('points');
            $table->dateTimeTz('finished_at')->nullable();
            $table->timestamps();

            $table->foreign('student_id')->on('users')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exercise_students');
    }
}
