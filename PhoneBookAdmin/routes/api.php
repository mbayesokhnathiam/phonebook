<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['jwt.auth'])->group(function () {

    Route::get('/data/pays', [\App\Http\Controllers\DataController::class,'pays']);
    Route::get('/data/villes', [\App\Http\Controllers\DataController::class,'villes']);
    Route::get('/data/typeinstituts', [\App\Http\Controllers\DataController::class,'typesInstituts']);
    Route::get('/data/instituts', [\App\Http\Controllers\DataController::class,'instituts']);
    Route::get('/filter/pays/{id}', [\App\Http\Controllers\DataController::class,'search']);


    Route::resource('/contacts',\App\Http\Controllers\ContactController::class);
    Route::get('/favoris/contacts',[\App\Http\Controllers\ContactController::class,'favoris']);
    Route::get('/delete/contacts',[\App\Http\Controllers\ContactController::class,'deleteContact']);
    Route::get('/favoris/list',[\App\Http\Controllers\ContactController::class,'favorisList']);
    Route::resource('/users',\App\Http\Controllers\UtilisateurController::class);
    Route::post('/search/contacts',[\App\Http\Controllers\ContactController::class,'searchContact']);
    Route::get('/format/contacts',[\App\Http\Controllers\ContactController::class,'formatContact']);
    Route::get('/settings/type', [\App\Http\Controllers\SettingsController::class,'paginateTypeInstitut']);
    Route::get('/settings/format-ville', [\App\Http\Controllers\SettingsController::class,'formatVille']);
    Route::get('/settings/format-type', [\App\Http\Controllers\SettingsController::class,'formatType']);
    Route::post('/settings/import-contact', [\App\Http\Controllers\SettingsController::class,'importContact']);
    Route::resource('/types',\App\Http\Controllers\TypeInstitutionController::class);
    Route::resource('/institutions',\App\Http\Controllers\InstitutionController::class);
    Route::resource('/villes',\App\Http\Controllers\VilleController::class);
    Route::resource('/pays',\App\Http\Controllers\PaysController::class);

// Auth
    Route::group([
        'middleware' => 'api',
        'prefix' => 'auth'
    ], function ($router) {

        Route::get('/reset/users', [AuthController::class, 'resetPassword'])->middleware('auth:api')->name('reset');
        Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('logout');
        Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api')->name('refresh');
    });

});

Route::post('/auth/register', [AuthController::class, 'register'])->name('register');
Route::post('/auth/login', [AuthController::class, 'login'])->name('login');
