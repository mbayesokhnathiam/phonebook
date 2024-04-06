<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/data/pays', [\App\Http\Controllers\DataController::class,'pays']);
Route::get('/api/data/villes', [\App\Http\Controllers\DataController::class,'villes']);
Route::get('/api/data/typeinstituts', [\App\Http\Controllers\DataController::class,'typesInstituts']);
Route::get('/api/data/instituts', [\App\Http\Controllers\DataController::class,'instituts']);
Route::get('/api/filter/pays/{id}', [\App\Http\Controllers\DataController::class,'search']);
