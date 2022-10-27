<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::prefix('v1')->group(function () {
    Route::middleware('auth:sanctum')->namespace('App\Http\Controllers')->group(function () {
        Route::namespace('API\V1')->group(function () {
            Route::post('logout', 'API\Auth\LoginLogoutController@logout')
                ->name('logout');
            Route::post('token', 'API\Auth\LoginLogoutController@token')
                ->name('token.obtain');

            Route::post('user/pin-code/resend', 'API\Auth\VerificationCodeController@resend')
                ->name('email.resend');
            Route::post('user/pin-code/verify', 'API\Auth\VerificationCodeController@verify')
                ->name('email.verify');

            Route::get('{folder}/{model}', 'GetDynamicModelController@display')
                ->name('v1.model');

            Route::get('{folder}/{model}/{scope}', 'GetDynamicModelController@display')
                ->name('v1.model.scope');

            Route::post('{folder}/{model}', 'PostDynamicModelController@store')
                ->name('v1.model.create');

            Route::post('{folder}/{model}/{scope}', 'PostDynamicModelController@store')
                ->name('v1.model.scope');

            Route::get('{folder}/{model}/detail/{id}', 'GetDynamicModelController@show')
                ->name('v1.model.detail');

            Route::delete('{folder}/{model}/detail/{id}', 'DeleteDynamicModelController@delete')
                ->name('v1.model.detail.delete');

            Route::put('{folder}/{model}/detail/{id}', 'PutDynamicModelController@update')
                ->name('v1.model.detail.update');
        });
    });

    Route::namespace('App\Http\Controllers\API')->group(function () {
        Route::post('login', 'Auth\LoginLogoutController@login')->name('login');
        Route::post('register', 'Auth\RegisterController@store')->name('register');
    });
});
