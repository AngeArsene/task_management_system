<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $projectId = $request->input('project_id');

        $projects = Project::all()->map(fn ($project) => [
            'id'    => $project->id,
            'name'  => $project->name,
            'color' => ProjectController::generateColor($project->id),
        ]);

        $tasks = Task::when($projectId, fn ($q) => $q->where('project_id', $projectId))
            ->orderBy('priority')
            ->get()
            ->map(fn ($task) => self::formate($task));

        return Inertia::render(
            'Welcome',
            [
                'tasks'           => $tasks,
                'projects'        => $projects,
                'selectedProject' => $projectId
            ]
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'project_id' => 'required|exists:projects,id',
        ]);

        $task = Task::create([
            'name'       => $request->name,
            'priority'   => Task::highestPriority($request->project_id) + 1,
            'project_id' => $request->project_id,
        ]);

        return response()->json(self::formate($task));
    }

    public function update(Request $request, Task $task)
    {
        $request->validate(['name' => 'required|string']);
        $task->update($request->only('name'));

        return response()->json(self::formate($task));
    }

    public function destroy(Task $task): JsonResponse
    {
        $task->delete();

        return response()->json(['status' => 'deleted']);
    }

    public function reorder(Request $request): JsonResponse
    {
        foreach ($request->orderedTaskIds as $index => $id) {
            Task::where('id', $id)->update(['priority' => $index + 1]);
        }

        return response()->json(['status' => 'ok']);
    }

    private static function formate (Task $task): array
    {
        return [
            'id'        => $task->id,
            'name'      => $task->name,
            'priority'  => $task->priority,
            'projectId' => $task->project_id,
            'createdAt' => $task->created_at,
            'updatedAt' => $task->updated_at,
        ];
    }
}
