// src/App/App.jsx
import { useState, useEffect } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoForm } from '../TodoForm/TodoForm';
import { Assistant } from '../Assistant/Assistant';
import { categories, getCategoryById } from './categories';
import defaultData from './defaultData.json';
import './styles.css';

export function App() {
  // Состояния приложения
  const [todos, setTodos] = useState(defaultData);
  const [darkMode, setDarkMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [assistantAction, setAssistantAction] = useState(null);
  const [completedToday, setCompletedToday] = useState(0);
  const [streak, setStreak] = useState(0);

  // Инициализация темы VK (без VK Bridge)
  useEffect(() => {
    // Эмуляция определения темы для локальной разработки
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Сброс дневного прогресса в полночь
  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);

    const timeout = setTimeout(() => {
      setCompletedToday(0);
      setAssistantAction({ type: 'newDay' });
    }, nextMidnight - now);

    return () => clearTimeout(timeout);
  }, []);

  // Добавление задачи
  const addTask = (userInput, category) => {
    if (userInput) {
      const newItem = {
        id: new Date().getTime(),
        task: userInput,
        completed: false,
        category: category || 'other'
      };
      setTodos([...todos, newItem]);
      setAssistantAction({ type: 'taskAdded' });
    }
  };

  // Удаление задачи
  const removeTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Переключение статуса задачи
  const handleToggle = (id) => {
    const taskIndex = todos.findIndex(t => t.id === id);
    const wasCompleted = todos[taskIndex].completed;

    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);

    if (!wasCompleted) {
      setAssistantAction({ type: 'taskCompleted' });
      setCompletedToday(prev => prev + 1);

      if (completedToday + 1 === 5) {
        setAssistantAction({ type: 'dailyGoalComplete' });
        setStreak(prev => prev + 1);
      }

      if (updatedTodos.every(t => t.completed)) {
        setAssistantAction({ type: 'allCompleted' });
      }
    } else {
      setCompletedToday(prev => Math.max(0, prev - 1));
    }
  };

  // Очистка выполненных задач
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Фильтрация задач по категории
  const filteredTodos = currentCategory === 'all'
    ? todos
    : todos.filter(todo => todo.category === currentCategory);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header">
        <h1>Список задач 📝</h1>
        <div className="header-actions">
          <div className="productivity-badge">
            <div className="streak">🔥 {streak}</div>
            <div className="daily-progress">
              {completedToday}/5
            </div>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      <div className="App__box">
        <TodoForm addTask={addTask} categories={categories} />

        <div className="productivity-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(completedToday / 5) * 100}%` }}
            ></div>
            <div className="progress-label">
              День: {completedToday}/5
            </div>
          </div>
        </div>

        <div className="categories-filter">
          <button
            className={`category-button ${currentCategory === 'all' ? 'active' : ''}`}
            onClick={() => setCurrentCategory('all')}
          >
            Все
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${currentCategory === category.id ? 'active' : ''}`}
              onClick={() => setCurrentCategory(category.id)}
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {filteredTodos.map(todo => {
          const category = getCategoryById(todo.category);
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              category={category}
              toggleTask={handleToggle}
              removeTask={removeTask}
            />
          );
        })}
      </div>

      <div className="App__footer">
        <div>
          {todos.length > 0 && todos.every(t => t.completed)
            ? `Все задачи выполнены ✨`
            : `Выполнено: ${todos.filter(t => t.completed).length} из ${todos.length}`}
        </div>
        {todos.some(todo => todo.completed) && (
          <button className="clear-button" onClick={clearCompleted}>
            Очистить выполненные
          </button>
        )}
      </div>

      <Assistant action={assistantAction} />
    </div>
  );
}