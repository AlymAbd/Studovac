<?php

namespace App\Models;

use App\Traits\ModelApiTrait;
use Illuminate\Database\Eloquent\Model as ModelParent;

class Model extends ModelParent
{
    use ModelApiTrait;

    public const API_ACCESS_TYPE_DENIED = 0;
    public const API_ACCESS_TYPE_CREATE = 1;
    public const API_ACCESS_TYPE_READ = 2;
    public const API_ACCESS_TYPE_WRITE = 3;
    public const API_ACCESS_TYPE_DELETE = 4;
    public const API_ACCESS_TYPE_ALL = [self::API_ACCESS_TYPE_CREATE, self::API_ACCESS_TYPE_DELETE, self::API_ACCESS_TYPE_READ, self::API_ACCESS_TYPE_WRITE];

    const MAX_LIMIT = 50;
    protected $relations = [];

    /**
     * array|integer
     */
    protected $accessType = self::API_ACCESS_TYPE_ALL;

    protected $hidden = ['id'];
    protected $filecol = 'filepath';

    public function relations()
    {
        return [];
    }

    public static function getAccessType(): int|array
    {
        return self::$accessType;
    }

    public function attachFile($path, $file, $id)
    {
        $record = $this->where('name', $id);
        $record->update([$this->filecol => '/storage/' . $path]);
        return $record;
    }

    public function getMaxLimit()
    {
        return self::MAX_LIMIT ?? 20;
    }

    public function getRelationNames($name = null)
    {
        $relations = $this->relations();
        if ($name) {
            if (array_key_exists($name, $relations)) {
                $relations = $relations[$name];
            } else {
                return null;
            }
        }
        return $relations;
    }
}
