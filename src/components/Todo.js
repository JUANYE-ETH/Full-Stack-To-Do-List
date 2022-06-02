import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function Todo({ todos, completeTodo, removeTodo, setEditObject }) {
	return todos.map((todo, index) => (
		<div
			className={todo.isComplete ? "todo-row complete" : "todo-row"}
			key={index}
		>
			<div key={todo.id} onClick={() => completeTodo(todo.id)}>
				{todo.text}
			</div>
			<div className="icons">
				<RiCloseCircleLine
					onClick={() => removeTodo(todo.id)}
					className="delete-icon"
				/>
				<TiEdit
					onClick={() =>
						setEditObject({
							id: todo.id,
							text: todo.text,
							category: todo.category,
							edit: true,
						})
					}
					className="edit-icon"
				/>
			</div>
		</div>
	));
}

export default Todo;
