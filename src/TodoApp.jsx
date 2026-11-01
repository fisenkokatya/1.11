import { useRef } from "react";
import { useTodoStore } from "./store/todoStore";

export default function TodoApp() {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = inputRef.current.value.trim();
    if (!text) return;
    addTodo(text);
    inputRef.current.value = "";
  };

  return (
    <div
      style={{ maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h1>Список задач</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Новая задача..."
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Добавить</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              style={{
                flex: 1,
                textDecoration: todo.completed ? "line-through" : "none",
                opacity: todo.completed ? 0.5 : 1,
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p>Задач пока нет</p>}
    </div>
  );
}
