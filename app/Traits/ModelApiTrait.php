<?php

namespace App\Traits;

trait ModelApiTrait
{
    public function rules($params = null, $object = null): array
    {
        return [
            'update' => ['name' => ['unique:' . $this->getTable(), 'max:64']],
            'created' => [],
        ];
    }

    public function updateModifierAfterValidation(array $query, $object = null): array
    {
        return $query;
    }

    public function updateModifierBeforeValidation(array $query, $object = null): array
    {
        $relations = $this->getRelationNames();
        foreach ($relations as $key => $relation) {
            if (array_key_exists($key, $query) && $rel = $this->{$relation}()) {;
                $rel = $rel->getRelated()->where('name', $query[$key])->first();
                if ($rel) {
                    $query[$key] = $rel->id;
                }
            }
        }
        return $query;
    }

    public function createModifierAfterValidation(array $query): array
    {
        return $query;
    }

    public function createModifierBeforeValidation(array $query): array
    {
        return $query;
    }

    public function afterUpdate($originalData = null, $modifiedData = null, $object = null)
    {
        $relations = $this->getRelationNames();
        foreach ($relations as $key => $relation) {
            if (array_key_exists($key, $modifiedData)) {;
                $object->{$key} = $object->{$relation}()->first();
            }
        }
        return $object;
    }

    public function afterSave($originalData = null, $modifiedData = null, $object = null)
    {
        return $object;
    }

    public function afterDelete($originalData = null, $modifiedData = null, $object = null)
    {
        return $object;
    }


    public static function generateUniqueName(): string
    {
        return uniqid();
    }

    public function getRules(String $type = null, $params = null, $object = null): array
    {
        $rules = $this->rules($params, $object);
        if (isset($type) && array_key_exists($type, $rules)) {
            return $rules[$type];
        } else {
            return $rules;
        }
        return [];
    }
}
