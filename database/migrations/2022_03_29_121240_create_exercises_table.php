<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExercisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->integer('exam_variant_id')->unsigned();
            $table->smallInteger('difficulty')->default(1); # range 0 - 5
            $table->integer('points')->default(0);
            $table->boolean('is_required')->default(false);
            $table->smallInteger('type_data')->default(1);
            $table->smallInteger('type_field')->default(1);
            $table->timestamps();

            $table->foreign('exam_variant_id')->on('variants')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exercises');
    }
}
