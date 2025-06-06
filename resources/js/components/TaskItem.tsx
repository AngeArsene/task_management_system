import React, { useState, useRef, useEffect } from 'react';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import { Task } from '@/types/index';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { useTaskStore } from '../store/useTaskStore';

export interface TaskItemProps {
    task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.name);
  const [isDeleting, setIsDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { updateTask, deleteTask } = useTaskStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleUpdate = async () => {
    if (taskName.trim() !== task.name) {
      await updateTask(task.id, taskName.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      setTaskName(task.name);
      setIsEditing(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (isDeleting) {
      await deleteTask(task.id);
    } else {
      setIsDeleting(true);
    }
  };

  const cancelDelete = () => {
    setIsDeleting(false);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A'; // handle null or empty string
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date'; // handle invalid date string

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <motion.div
      ref={setNodeRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isDragging ? 1.02 : 1,
      }}
      exit={{ opacity: 0, height: 0 }}
      transition={{
        duration: 0.2,
        ease: 'easeInOut',
      }}
      className={clsx(
        'relative group bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3',
        'hover:shadow-md transition-all duration-200 ease-in-out',
        isDragging ? 'z-10 shadow-md bg-blue-50' : '',
        task.priority <= 3 ? 'border-l-4' : ''
      )}
      style={{
        ...style,
        borderLeftColor:
          task.priority === 1
            ? '#EF4444'
            : task.priority === 2
            ? '#F97316'
            : task.priority === 3
            ? '#3B82F6'
            : 'transparent',
        borderLeftWidth: task.priority <= 3 ? '4px' : '1px',
      }}
    >
      <div className="flex items-center">
        <div
          {...attributes}
          {...listeners}
          className="mr-3 cursor-grab flex items-center justify-center w-6 h-6 text-gray-400
                     hover:text-gray-600 active:cursor-grabbing"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4H6V6H4V4ZM4 7H6V9H4V7ZM4 10H6V12H4V10ZM10 4H12V6H10V4ZM10 7H12V9H10V7ZM10 10H12V12H10V10Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleUpdate}
                className="ml-2 p-1 text-green-600 hover:text-green-700"
                title="Save"
              >
                <Check size={18} />
              </button>
              <button
                onClick={() => {
                  setTaskName(task.name);
                  setIsEditing(false);
                }}
                className="ml-1 p-1 text-red-600 hover:text-red-700"
                title="Cancel"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="font-medium text-gray-900">{task.name}</div>
              <div className="mt-1 text-xs text-gray-500">
                Last updated: {formatDate(task.updatedAt)}
              </div>
            </div>
          )}
        </div>

        {!isEditing && !isDeleting && (
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
              title="Edit task"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="p-1 text-gray-500 hover:text-red-600 transition-colors"
              title="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}

        {isDeleting && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDeleteConfirm}
              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
            >
              Confirm
            </button>
            <button
              onClick={cancelDelete}
              className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="absolute top-2 right-2">
        <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full text-xs font-medium text-gray-800">
          {task.priority}
        </span>
      </div>
    </motion.div>
  );
}
