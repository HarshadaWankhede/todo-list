import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TodoList from "./components/TodoList";


function App() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">React Todolist</a>
        </div>
      </nav>
   <TodoList/>

    </>
  );
}

export default App;
