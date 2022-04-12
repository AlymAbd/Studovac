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
            $table->string('description', 600);
            $table->integer('attachment_id')->unsigned();
            $table->smallInteger('difficulty')->nullable();
            $table->smallInteger('max_attempts')->default(3);
            $table->boolean('manual_cheking')->default(false);
            $table->boolean('case_sensetive')->default(false);
            $table->boolean('allow_empty')->default(false);
            $table->string('validation', 100)->default('default'); # is_required, max500sym etc
            $table->string('data_type');
            $table->string('data_style');
            $table->string('data_format');
            $table->timestamps();

            $table->foreign('attachment_id')->on('attachments')->references('id');
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
