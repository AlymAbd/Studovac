<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExerciseAnswerOptionsTable extends Migration
{
    public $table = 'exam_exercise_answer_options';

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
            $table->bigInteger('exercise_id')->unsigned();
            $table->string('answer', 1200);
            $table->boolean('is_correct')->default(false);
            $table->timestamps();

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
