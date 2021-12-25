import React, { useState } from "react";

const Form = () => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const onTodoFormSubmit = new CustomEvent("onTodoFormSubmit", {
      detail: { value },
    });
    dispatchEvent(onTodoFormSubmit);
    setValue("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add Todo"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
