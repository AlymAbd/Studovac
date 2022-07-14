<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamsTable extends Migration
{
    public $table = 'exams';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Exam table contains all the exams of course
        Schema::create($this->table, function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('unique_name', 63);
            $table->string('title', 255);
            $table->dateTimeTz('active_from');
            $table->dateTimeTz('active_to');
            $table->string('description_for_student', 1200)->nullable();
            $table->string('description_for_teacher', 1200)->nullable();
            $table->integer('duration_minutes')->default(60);
            $table->enum('calculation_type', ['points', 'percent'])->default('percent');
            $table->enum('type', ['practice', 'final']);
            $table->integer('exercise_limit')->nullable(); //for auto-distribution
            $table->bigInteger('creator_id')->unsigned();
            $table->integer('level_logic_id')->nullable()->unsigned();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('creator_id')->on('users')->references('id')->onDelete('cascade');
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
