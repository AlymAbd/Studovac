<?php

use Illuminate\Database\Migrations\Migration;
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
        // for quick search
        Schema::create($this->table, function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 63);
            $table->bigInteger('exercise_id')->unsigned();
            $table->string('tag');
            $table->timestamps();

            $table->foreign('exercise_id')->on('exam_exercises')->references('id')->onDelete('cascade');
            $table->index('tag');
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
