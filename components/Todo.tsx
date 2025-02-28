import React from 'react';
import { Trash2 } from 'lucide-react';

type TodoProps = {
  id: number;
  text: string;
  completed: boolean;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

const Todo: React.FC<TodoProps> = ({ id, text, completed, toggleTodo, deleteTodo }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-2">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleTodo(id)}
          className="form-checkbox h-4 w-4 text-blue-500"
        />
        <span className={completed ? 'line-through text-gray-400' : ''}>{text}</span>
      </label>
      <button onClick={() => deleteTodo(id)}>
        <Trash2 size={20} />
      </button>
    </div>
  );
}

export default Todo;
