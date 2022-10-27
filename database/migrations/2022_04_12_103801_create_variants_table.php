<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVariantsTable extends Migration
{
    public $table = 'exam_variants';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // distributed exercise
        Schema::create($this->table, function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 63);
            $table->string('title', 255);
            $table->bigInteger('exam_id')->unsigned();
            $table->timestamps();

            $table->foreign('exam_id')->on('exams')->references('id')->onDelete('cascade');
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
