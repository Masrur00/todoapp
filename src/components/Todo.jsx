import { useState } from "react";
import { Button } from "react-bootstrap";

export function Todo({ todo, id, markTodo, removeTodo, editTodo }) {
  const [edit, setEdit] = useState(false);
  const [val, setValue] = useState(todo.text || "");

  const onButtonClick = () => {
    setEdit(!edit);
  };

  const updateTask = (id) => {
    const params = {
        id,text:val
    }
    editTodo(params)
    setEdit(!edit);
  }

  return (
    <div className="todo" key={id}>
      <span
        style={{
          textDecoration: todo.isDone ? "line-through" : "",
          display: edit ? "none" : "block",
        }}
      >
        {todo.text}
      </span>
      <input
        type="text"
        value={val}
        onChange={(e) => setValue(e.target.value)}
        style={{
          display: edit ? "block" : "none",
          width: 700,
          marginBottom: 10,
        }}
      />
      <div>
        <Button variant="outline-success" onClick={() => markTodo(todo)}>
          ✓
        </Button>{" "}
        <Button variant="outline-danger" onClick={() => removeTodo(id)}>
          ✕
        </Button>
        <Button
          variant="outline-success"
          style={{ display: edit ? "none" : "block" }}
          onClick={() => onButtonClick(id)}
        >
          Edit
        </Button>
        <Button
          variant="outline-success"
          style={{ display: edit ? "block" : "none" }}
          onClick={() => updateTask(id)}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
