import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    window.addEventListener("onTodoFormSubmit", (e) => {
      const value = e.detail.value;
      setTodos((prev) => [
        {
          id: new Date().getMilliseconds(),
          value,
          completed: false,
          editing: false,
        },
        ...prev,
      ]);
    });

    const localTodos = localStorage.getItem("todo-microfrontend");
    setTodos(JSON.parse(localTodos));

    return () => {
      window.removeEventListener("onTodoFormSubmit");
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("todo-microfrontend", JSON.stringify(todos));
  }, [todos]);

  const _onDeleteTodo = (id) => {
    const newList = [...todos].filter((t) => t.id !== id);
    setTodos(newList);
  };

  const _onToggleCheckbox = (e) => {
    const { id, checked } = e.target;
    const temp = [...todos];
    const item = temp.find((t) => t.id === Number(id));
    item.completed = checked;
    setTodos(temp);
  };

  const _onEditCompleted = (e) => {
    const { id, value } = e.target;
    const temp = [...todos];
    const item = temp.find((t) => t.id === Number(id));
    if (value) {
      item.value = value;
    }
    item.editing = false;
    setTodos(temp);
  };

  const _enableEditing = (id) => {
    const temp = [...todos];
    const item = temp.find((t) => t.id === Number(id));
    item.editing = true;

    setTodos(temp);
  };

  return (
    <div className="w-100">
      <p className="small text-end  text-muted mb-1">
        You have{" "}
        <span className="text-dark fw-bold ">
          {todos.filter((t) => t.completed === false).length}
        </span>{" "}
        todos
      </p>
      <p className="small text-end  text-muted">
        <span className="text-success fw-bold">
          {todos.filter((t) => t.completed === true).length}
        </span>{" "}
        todos completed
      </p>
      <ul className="list-group list-unstyled">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="list-group-item d-flex align-items-center justify-content-between"
              style={{ background: todo.completed && "#eee" }}
            >
              <div>
                <input
                  id={todo.id}
                  className="form-check-input me-1"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={_onToggleCheckbox}
                />
                {todo.editing ? (
                  <input
                    id={todo.id}
                    defaultValue={todo.value}
                    onChange={(e) => ({})}
                    onBlur={_onEditCompleted}
                  />
                ) : (
                  <span
                    className={` ms-2 ${
                      todo.completed
                        ? "text-muted text-decoration-line-through"
                        : ""
                    }`}
                  >
                    {todo.value}
                  </span>
                )}
              </div>

              <i
                className="fas fa-edit ms-auto"
                onClick={() => _enableEditing(todo.id)}
              ></i>
              <i
                className="fas fa-trash-alt ms-2 text-danger"
                onClick={() => _onDeleteTodo(todo.id)}
              ></i>
            </li>
          ))
        ) : (
          <li className="small fw-bold text-muted text-center">
            Add todos to see here
          </li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
