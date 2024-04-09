<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('/contacts',\App\Http\Controllers\ContactController::class);
Route::get('/settings/type', [\App\Http\Controllers\SettingsController::class,'paginateTypeInstitut']);
Route::get('/settings/format-ville', [\App\Http\Controllers\SettingsController::class,'formatVille']);
Route::get('/settings/format-type', [\App\Http\Controllers\SettingsController::class,'formatType']);
Route::resource('/types',\App\Http\Controllers\TypeInstitutionController::class);
