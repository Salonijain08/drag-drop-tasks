import React, { useState } from "react";

const initialTasks = Array.from({ length: 10 }, (_, i) => ({
  id: `task-${i}`,
  content: `Test Task ${i + 1}`
}));

const initialColumns = {
  today: {
    name: "Today",
    tasks: []
  },
  tomorrow: {
    name: "Tomorrow",
    tasks: []
  },
  thisWeek: {
    name: "This Week",
    tasks: []
  },
  nextWeek: {
    name: "Next Week",
    tasks: []
  },
  unplanned: {
    name: "Unplanned",
    tasks: initialTasks
  }
};

function App() {
  const [columns, setColumns] = useState(initialColumns);
  const [draggingTask, setDraggingTask] = useState(null);

  const onDragStart = (event, task, columnId) => {
    event.dataTransfer.setData("taskId", task.id);
    event.dataTransfer.setData("sourceColumn", columnId);
    setDraggingTask(task);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, columnId) => {
    const taskId = event.dataTransfer.getData("taskId");
    const sourceColumn = event.dataTransfer.getData("sourceColumn");

    // Get the task being dragged
    const taskToMove = columns[sourceColumn].tasks.find((task) => task.id === taskId);

    // Remove the task from its source column
    const sourceTasks = columns[sourceColumn].tasks.filter((task) => task.id !== taskId);

    // Add the task to the destination column
    const destTasks = [...columns[columnId].tasks, taskToMove];

    // Update the state with the new columns
    setColumns({
      ...columns,
      [sourceColumn]: {
        ...columns[sourceColumn],
        tasks: sourceTasks
      },
      [columnId]: {
        ...columns[columnId],
        tasks: destTasks
      }
    });

    setDraggingTask(null);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {Object.entries(columns).map(([columnId, column]) => (
        <div
          key={columnId}
          onDragOver={onDragOver}
          onDrop={(event) => onDrop(event, columnId)}
          style={{
            backgroundColor: "lightgrey",
            padding: "10px",
            width: "250px",
            minHeight: "500px",
            margin: "10px"
          }}
        >
          <h3>{column.name}</h3>
          {column.tasks.map((task, index) => (
            <div
              key={task.id}
              draggable
              onDragStart={(event) => onDragStart(event, task, columnId)}
              style={{
                padding: "16px",
                marginBottom: "8px",
                backgroundColor: draggingTask && draggingTask.id === task.id ? "#456C86" : "#263B4A",
                color: "white",
                cursor: "move"
              }}
            >
              {task.content}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
