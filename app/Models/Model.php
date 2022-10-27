<?php

namespace App\Models;

use App\Traits\ModelApiTrait;
use Illuminate\Database\Eloquent\Model as ModelParent;

class Model extends ModelParent
{
    public const API_ACCESS_TYPE_DENIED = 0;
    public const API_ACCESS_TYPE_CREATE = 1;
    public const API_ACCESS_TYPE_READ = 2;
    public const API_ACCESS_TYPE_WRITE = 3;
    public const API_ACCESS_TYPE_DELETE = 4;
    public const API_ACCESS_TYPE_ALL = [self::API_ACCESS_TYPE_CREATE, self::API_ACCESS_TYPE_DELETE, self::API_ACCESS_TYPE_READ, self::API_ACCESS_TYPE_WRITE];

    protected $hidden = ['id'];

    use ModelApiTrait;
    /**
     * array|integer
     */
    protected $accessType = self::API_ACCESS_TYPE_ALL;

    public static function getAccessType(): int|array
    {
        return self::$accessType;
    }

    public static function getTableName()
    {
        return (new self)->getTable();
    }
}
