<?php

namespace App\Models;

use App\Traits\ModelApiTrait;
use Illuminate\Database\Eloquent\Model as ModelParent;

class Model extends ModelParent
{
    use ModelApiTrait;

    public static function getTableName()
    {
        return (new self)->getTable();
    }
}
