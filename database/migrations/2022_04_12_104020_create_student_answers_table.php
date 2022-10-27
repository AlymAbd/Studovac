<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentAnswersTable extends Migration
{
    public $table = 'exam_student_answers';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->table, function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 63);
            $table->bigInteger('student_variant_id')->unsigned();
            $table->bigInteger('exercise_id')->unsigned();
            $table->boolean('is_correct');
            $table->string('string_answer', 1500);
            $table->timestamps();

            $table->foreign('student_variant_id')->on('exam_student_exam_variants')->references('id')->onDelete('cascade');
            $table->foreign('exercise_id')->on('exam_exercises')->references('id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists($this->table);
    }
}
