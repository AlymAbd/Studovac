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
            $table->string('unique_name', 63);
            $table->string('description', 1200);
            $table->bigInteger('attachment_id')->unsigned();
            $table->smallInteger('difficulty')->nullable();     // 0-10
            $table->smallInteger('max_attempts')->default(3);
            $table->boolean('manual_cheking')->default(false);  // if it's required to manual check, there is no options to display
            $table->boolean('case_sensetive')->default(false);
            $table->string('help', 1200)->nullable();           // help text
            $table->string('validation', 100)->default('default'); // is_required, max500sym etc
            $table->string('input_style');                      // select, input, checkbox
            $table->string('data_format');                      // integer, boolean, string, text, date
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
