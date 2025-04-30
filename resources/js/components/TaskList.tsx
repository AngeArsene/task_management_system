import React from 'react';
import { TaskItem } from './TaskItem';
import { Task } from '../types/task';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { useTaskStore } from '../store/useTaskStore';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const { updateTask, deleteTask, reorderTasks } = useTaskStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex(task => String(task.id) === String(active.id));
    const newIndex = tasks.findIndex(task => String(task.id) === String(over.id));

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(tasks, oldIndex, newIndex);

    // Update priorities in the reordered array
    const withUpdatedPriorities = reordered.map((task, index) => ({
        ...task,
        priority: index + 1
    }));

    reorderTasks(withUpdatedPriorities);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <motion.div layout className="mt-6 space-y-3">
        <SortableContext
          items={tasks.map(task => String(task.id))} // dnd-kit expects string IDs
          strategy={verticalListSortingStrategy}
        >
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={(name) => updateTask(task.id, name)}
                onDelete={() => deleteTask(task.id)}
              />
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              <p>No tasks yet. Add your first task above!</p>
            </div>
          )}
        </SortableContext>
      </motion.div>
    </DndContext>
  );
}
