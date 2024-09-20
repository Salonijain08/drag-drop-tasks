import React from "react";
import { Draggable } from "react-beautiful-dnd";

const TaskList = ({ column, columnId, provided, snapshot }) => {
  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      style={{
        background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
        padding: 8,
        width: 250,
        minHeight: 500,
        margin: 10
      }}
    >
      <h3>{column.name}</h3>
      {column.tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                userSelect: "none",
                padding: 16,
                margin: "0 0 8px 0",
                minHeight: "50px",
                backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
                color: "white",
                ...provided.draggableProps.style
              }}
            >
              {task.content}
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  );
};

export default TaskList;
