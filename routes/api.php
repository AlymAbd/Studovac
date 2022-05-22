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


Route::namespace('App\Http\Controllers\API')->group(function () {
    Route::get('data/{model}', 'DynamicModelController@display')
        ->name('data.model');
    Route::post('data/{model}', 'DynamicModelController@store')
        ->name('data.model.create');
    Route::get('data/{model}/detail/{id}', 'DynamicModelController@show')
        ->name('data.model.detail');
    Route::delete('data/{model}/detail/{id}', 'DynamicModelController@delete')
        ->name('data.model.detail.delete');
    Route::put('data/{model}/detail/{id}', 'DynamicModelController@update')
        ->name('data.model.detail.update');


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
