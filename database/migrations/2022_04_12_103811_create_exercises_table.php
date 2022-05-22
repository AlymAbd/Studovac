<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExercisesTable extends Migration
{
    public $table = 'exam_exercises';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->table, function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('description', 600);
            $table->bigInteger('attachment_id')->unsigned();
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

            $table->foreign('attachment_id')->on('exam_attachments')->references('id')->onDelete('cascade');
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
