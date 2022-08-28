<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\API\ApiModelController;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RegisterController extends ApiModelController
{
    public function store(Request $request)
    {
        $requestData = $request->all();
        $model = new \App\Models\System\User;
        $requestData = $model->createModifierBeforeValidation($requestData);
        $requestData = $this->validate($requestData, $model->getRules('create'))->validated();
        $requestData = $model->createModifierAfterValidation($requestData);
        $requestData['unique_name'] = \App\Models\Model::generateUniqueName();
        $result = $model::create($requestData);
        $userSettings = new \App\Models\System\UserSetting;
        $userSettings::create([
            'user_id' => $result['id'],
            'settings' => [
                'lang' => 'cz',
                'device' => ['desktop' => true, 'mobile' => false],
                'dark_mode' => false,
                'location' => 'CZE',
                'account_adress' => null,
                'email_notifications' => false,
                'telegram_notifications' => false,
                'telegram_id' => null,
            ]
        ]);

        return response()->json(['data' => $result, 'settings' => $userSettings], Response::HTTP_CREATED);
    }
}
