<?php

namespace App\Models;

use App\Traits\ModelApiTrait;
use Illuminate\Database\Eloquent\Model as ModelParent;
use Illuminate\Support\Facades\Storage;

class Model extends ModelParent
{
    public const API_ACCESS_TYPE_DENIED = 0;
    public const API_ACCESS_TYPE_CREATE = 1;
    public const API_ACCESS_TYPE_READ = 2;
    public const API_ACCESS_TYPE_WRITE = 3;
    public const API_ACCESS_TYPE_DELETE = 4;
    public const API_ACCESS_TYPE_ALL = [self::API_ACCESS_TYPE_CREATE, self::API_ACCESS_TYPE_DELETE, self::API_ACCESS_TYPE_READ, self::API_ACCESS_TYPE_WRITE];

    use ModelApiTrait;
    /**
     * array|integer
     */
    protected $accessType = self::API_ACCESS_TYPE_ALL;

    protected $hidden = ['id'];
    protected $filecol = 'filepath';

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
}
