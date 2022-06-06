import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
	const [edit, setEdit] = useState({
		id: null,
		text: "",
		category: {},
	});
	// console.log(todos.name);
	function submitUpdate(value) {
		updateTodo(edit.id, value);
		setEdit({
			id: null,
			text: "",
			category: {},
		});
	}

	if (edit.id) {
		return <TodoForm edit={edit} onSubmit={submitUpdate} />;
	}

	return todos.map((todo, index) => (
		<div
			className={todo.isComplete ? "todo-row complete" : "todo-row"}
			key={index}
		>
			<div key={todo.id} onClick={() => completeTodo(todo.id)}>
				<span>
					{" "}
					{todo.text}, Category: {todo.category.name}
				</span>
			</div>
			<div className="icons">
				<RiCloseCircleLine
					onClick={() => removeTodo(todo.id)}
					className="delete-icon"
				/>
				<TiEdit
					onClick={() =>
						setEdit({ id: todo.id, text: todo.text, category: todo.category })
					}
					className="edit-icon"
				/>
			</div>
		</div>
	));
}

export default Todo;
