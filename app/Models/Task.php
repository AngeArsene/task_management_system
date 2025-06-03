<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $fillable = ['name', 'priority', 'project_id'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public static function highestPriority(int $project_id): int
    {
        return self::where('project_id', $project_id)->max('priority');
    }
}
