<?php

use Database\Custom\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExerciseTagsTable extends Migration
{
    public $table = 'exam_exercise_tags';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->table, function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('exercise_id')->unsigned();
            $table->string('tag');
            $table->timestamps();

            $table->foreign('exercise_id')->on('exercises')->references('id')->onDelete('cascade');
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
