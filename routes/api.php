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

Route::middleware('auth:sanctum')->group(function() {
    Route::prefix('v1')->namespace('App\Http\Controllers\API\V1')->group(function() {
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

    Route::post('logout', 'Auth\LoginLogoutController@logout')
        ->name('logout')
        ->middleware('auth:sanctum');
});

Route::namespace('App\Http\Controllers\API')->group(function() {
    Route::post('login', 'Auth\LoginLogoutController@login')->name('login');
    Route::post('register', 'Auth\RegisterController@store')->name('register');
    Route::post('user/pin-code/resend', 'Auth\VerifyPinController@resend');
    Route::post('user/pin-code/verify', 'Auth\VerifyPinController@verify');    
});
