<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLevelsTable extends Migration
{
    public $table = 'exam_levels';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Level of the exam. Example: A1, A2, B1, B2, Junior, Middle etc
        Schema::create($this->table, function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('unique_name', 63);
            $table->string('level_name', 255);
            $table->integer('level_id')->unsigned(); // foreign key

            // calcluation
            $table->integer('max_seconds_to_reach')->nullable();    // max limit of time to reach level
            $table->integer('max_points_to_reach')->nullable();     // total amount of points to reach level
            $table->integer('max_percent_to_reach')->nullable();    // percent of correct answers from the total
            // seconds + points (percent) works like AND
            // points + percent cannot be

            $table->timestamps();

            $table->index('level_id');
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
