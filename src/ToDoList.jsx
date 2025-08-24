import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([
    { text: "Eat Breakfast", completed: false },
    { text: "Take a shower", completed: false },
    { text: "Go to the gym", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() === "") {
      alert("⚠️ Please enter a task before adding!");
      return;
    }
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  }

  function deleteTask(index) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    }
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index - 1], updatedTasks[index]] = [
        updatedTasks[index],
        updatedTasks[index - 1],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index + 1], updatedTasks[index]] = [
        updatedTasks[index],
        updatedTasks[index + 1],
      ];
      setTasks(updatedTasks);
    }
  }

  function toggleTaskCompletion(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List ✅</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button className="add-button" onClick={addTask}>
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="no-tasks">🎉 No tasks left! Add a new one.</p>
      ) : (
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <span
                className={`task ${task.completed ? "completed" : ""}`}
                onClick={() => toggleTaskCompletion(index)}
              >
                {task.text}
              </span>
              <div className="buttons">
                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
                <button
                  className="move-up-button"
                  onClick={() => moveTaskUp(index)}
                >
                  Move Up
                </button>
                <button
                  className="move-down-button"
                  onClick={() => moveTaskDown(index)}
                >
                  Move Down
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default ToDoList;
