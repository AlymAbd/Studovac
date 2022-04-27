<?php

use Database\Custom\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentExamVariantsTable extends Migration
{
    public $table = 'exam_student_exam_variants';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->table, function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('student_id')->unsigned();
            $table->bigInteger('exam_variant_id')->unsigned();
            $table->dateTimeTz('started_at')->nullable();
            $table->dateTimeTz('finished_at')->nullable();
            $table->dateTimeTz('deadline_at')->nullable();
            $table->timestamps();

            $table->foreign('student_id')->on('users')->references('id')->onDelete('cascade');
            $table->foreign('exam_variant_id')->on('variants')->references('id')->onDelete('cascade');
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
