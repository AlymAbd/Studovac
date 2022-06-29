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

Route::prefix('v1')->namespace('App\Http\Controllers\API\V1')->group(function() {
    Route::get('{folder}/{model}', 'DynamicModelController@display')
        ->name('v1.model');

    Route::post('{folder}/{model}', 'DynamicModelController@store')
        ->name('v1.model.create');

    Route::get('{folder}/{model}/detail/{id}', 'DynamicModelController@show')
        ->name('v1.model.detail');

    Route::delete('{folder}/{model}/detail/{id}', 'DynamicModelController@delete')
        ->name('v1.model.detail.delete');

    Route::put('{folder}/{model}/detail/{id}', 'DynamicModelController@update')
        ->name('v1.model.detail.update');

    Route::middleware('verify-pin')->group(function () {
        Route::post('login', 'Auth\LoginLogoutController@login')
            ->name('login');

        Route::post('logout', 'Auth\LoginLogoutController@logout')
            ->name('logout')
            ->middleware('auth:sanctum');
    });

    Route::post('user/pin-code/resend', 'Auth\VerifyPinController@resend');
    Route::post('user/pin-code/verify', 'Auth\VerifyPinController@verify');

    Route::post('register', 'Auth\RegisterController@register')
        ->name('register');


    // Route::middleware('auth:sanctum')->group(function () {

    // });
});

