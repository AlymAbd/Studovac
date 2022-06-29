<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('name', 63);
            $table->string('title', 255);
            $table->text('description');
            $table->integer('creator_id')->unsigned();
            $table->integer('moderator_id')->unsigned();
            $table->dateTime('active_from');
            $table->dateTime('active_to');
            $table->dateTime('deactivated_at')->nullable();
            $table->string('path_to_photo', 255)->nullable();
            $table->string('style', 255)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
