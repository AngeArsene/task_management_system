<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProjectController;

Route::get('/', [TaskController::class, 'index'])->name('tasks.index');
Route::resource('tasks', TaskController::class)->except(['show', 'index']);
Route::resource('projects', ProjectController::class)->only(['store', 'index']);
Route::post('/tasks/reorder', [TaskController::class, 'reorder'])->name('tasks.reorder');
