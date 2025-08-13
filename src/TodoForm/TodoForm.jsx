import { useState } from 'react';
import './styles.css';

export function TodoForm({ addTask, categories }) {
  const [userInput, setUserInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput, selectedCategory);
    setUserInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        className="TodoForm__input"
        value={userInput}
        type="text"
        onChange={handleChange}
        placeholder="Новая задача..."
      />

      <select
        className="TodoForm__select"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button className="TodoForm__button">Добавить</button>
    </form>
  );
}