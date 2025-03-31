import { useState } from "react";

export default function TodoList() {
  let [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  function addTask(obj) {
    let newTasks = [...tasks, obj]; 
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks)); 
  }

  function handleDeleteTask(id) {
    let newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  function handleToggleTask(id) {
    let newTasks = tasks.map(task => 
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks)); 
  }


  return (
    <>
      <Form onAddItem={addTask} />
      <TaskList taskList={tasks} onDeleteItem={handleDeleteTask} onToggleItem={handleToggleTask} />
      <Stats taskList={tasks} />
    </>
  );
}


function Form({ onAddItem }) {
  let [task, setTask] = useState("");

  function handleSubmitTask(e) {
    e.preventDefault();
    if (task.trim() === "") return;
    let newObj = { taskName: task, id: Math.trunc(Math.random() * 1000), isDone: false };
    onAddItem(newObj);
    setTask("");
  }

  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-5 m-auto">
          <div className="card mt-4">
            <div className="card-header text-center bg-dark text-white">
              <h3>To Do List</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmitTask}>
                <div className="mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <input type="submit" className="btn btn-dark" value="Add Task" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function TaskList({ taskList, onDeleteItem, onToggleItem }) {
  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-5 m-auto">
          <div className="card mt-4">
            <div className="card-body">
              {taskList.length === 0 ? (
                <h5 className="text-center text-muted">No tasks added yet</h5>
              ) : (
                taskList.map((task) => (
                  <Task item={task} key={task.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function Task({ item, onDeleteItem, onToggleItem }) {
  return (
    <ul className="list-group">
      <li className="list-group-item list-group-item-secondary mb-2 d-flex align-items-center justify-content-between">
        <div>
          <input 
            type="checkbox" 
            checked={item.isDone} 
            onChange={() => onToggleItem(item.id)} 
            className="me-2" 
          />
          <span className="fw-bold" style={item.isDone ? { textDecoration: "line-through" } : {}}>
            {item.taskName}
          </span>
        </div>
        <button className="btn btn-danger btn-sm" onClick={() => onDeleteItem(item.id)}>❌</button>
      </li>
    </ul>
  );
}


function Stats({ taskList }) {
  let totalTasks = taskList.length;
  if (totalTasks === 0) {
    return ;
  }

  let completedTasks = taskList.filter(task => task.isDone).length;
  let percentage = Math.trunc((completedTasks / totalTasks) * 100);

  return (
    <>
    <div className="text-center mt-3">
        {
      percentage === 100?<h1>Congratualtions! You have done daily tasks ({percentage}%) </h1> :
      <h1>You have {totalTasks} Item in your list,then you have completed {completedTasks} Tasks.({percentage}%) </h1>
    }
    </div>
    </>
  );
}
