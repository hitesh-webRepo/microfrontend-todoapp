import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom";

import "./index.css";

const TodoForm = React.lazy(() => import("Forms/TodoForm"));
const TodosList = React.lazy(() => import("Todos/List"));

const App = () => {
  return (
    <div className="container">
      <Suspense fallback={<p>Loading form ...</p>}>
        <TodoForm />
      </Suspense>
      <Suspense fallback={<p>Loading list ...</p>}>
        <TodosList />
      </Suspense>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
