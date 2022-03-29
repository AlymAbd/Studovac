<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->dateTimeTz('active_from');
            $table->dateTimeTz('active_to');
            $table->string('description_for_student', 1200)->nullable();
            $table->string('description_for_teacher', 1200)->nullable();
            $table->integer('duration_minutes')->default(60);
            $table->integer('creator_id')->unsigned();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('creator_id')->on('users')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exams');
    }
}
