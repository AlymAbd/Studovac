<?php

namespace Database\Custom;

use Illuminate\Database\Migrations\Migration as Migrations;

class Migration extends Migrations
{
    /** 
     * @str table name
    */
    public $table = '';

    /**
     * Returns tablename
     * @return string
     */
    public static function getTableName(): string {
        return (new self)->table;
    }
}
