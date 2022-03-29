<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->integer('exercises_id')->unsigned();
            $table->string('answer_string', 5000)->nullable();
            $table->integer('answer_integer')->nullable();
            $table->dateTimeTz('answer_date')->nullable();
            $table->boolean('answer_bool')->nullable();
            $table->boolean('is_correct')->default(false);
            $table->timestamps();

            $table->foreign('exercises_id')->on('exercises')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('answers');
    }
}
