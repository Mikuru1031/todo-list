'use client';

import { useState, useEffect } from 'react';
import Todo from '../components/Todo';

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === '') return;
    const newTodo: TodoItem = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      addTodo();
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white text-gray-900 shadow-lg rounded-lg border border-gray-300">
      <h1 className="text-3xl font-semibold text-center mb-6">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          className="flex-1 p-3 border border-gray-300 rounded-l bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
          placeholder="ToDoを入力..."
        />
        <button
          onClick={addTodo}
          className="p-3 bg-black hover:bg-gray-800 text-white rounded-r shadow-md h-12"
        >
          追加
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {todos.map(todo => (
          <Todo 
            key={todo.id} 
            id={todo.id} 
            text={todo.text} 
            completed={todo.completed} 
            toggleTodo={toggleTodo} 
            deleteTodo={deleteTodo} 
          />
        ))}
      </ul>
    </div>
  );
}
