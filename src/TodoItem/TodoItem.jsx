import './styles.css';

export function TodoItem({ todo, category, toggleTask, removeTask }) {
  return (
    <div className={`TodoItem${todo.completed ? ' TodoItem--completed' : ''}`}>
      <div
        className="TodoItem__category-marker"
        style={{ backgroundColor: category.color }}
      />

      <label className="TodoItem__in">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTask(todo.id)}
        />
        <div>{todo.task}</div>
      </label>

      <div className="TodoItem__category-label">
        {category.name}
      </div>

      <button className="TodoItem__remove" onClick={() => removeTask(todo.id)}>
        ×
      </button>
    </div>
  );
}