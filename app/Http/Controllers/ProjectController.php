<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource with camelCase fields.
     */
    public function index()
    {
        return Project::all()->map(function ($project) {
            return [
                'id' => $project->id,
                'name' => $project->name,
                'createdAt' => $project->created_at,
                'updatedAt' => $project->updated_at,
                'color' => self::generateColor($project->id)
            ];
        });
    }

    /**
     * Store a newly created project.
     */
    public function store(Request $request)
    {
        $request->validate(['name' => 'required']);
        $project = Project::create(['name' => $request->name]);

        return response()->json([
            'id'    => $project->id,
            'name'  => $project->name,
            'color' => self::generateColor($project->id)
        ]); // ✅ required for frontend update
    }

    /**
     * Optionally generate a color for each project (you can customize this).
     */
    public static function generateColor($id)
    {
        // Example: return one of several colors based on project ID
        $colors = ['#EF4444', '#F97316', '#3B82F6', '#10B981', '#6366F1'];
        return $colors[$id % count($colors)];
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(['status' => 'deleted']);
    }
}
