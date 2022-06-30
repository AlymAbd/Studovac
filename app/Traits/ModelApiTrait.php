<?php

namespace App\Traits;

trait ModelApiTrait
{
    public function rules(): array
    {
        return ['unique_name' => ['unique' . static::getTableName(), 'max:64']];
    }

    public function updateModifierAterValidation(array $query): array
    {
        return $query;
    }

    public function updateModifierBeforeValidation(array $query): array
    {
        return $query;
    }

    public function putModifierAterValidation(array $query): array
    {
        return $query;
    }

    public function putModifierBeforeValidation(array $query): array
    {
        return $query;
    }

    public static function generateUniqueName(): string
    {
        return uniqid();
    }

    public function getRules(String $type = null): array
    {
        $rules = $this->rules();
        if (isset($type) && array_key_exists($type, $rules)) {
            return $rules[$type];
        } else {
            return $rules;
        }
        return [];
    }
}
