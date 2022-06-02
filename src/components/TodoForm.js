import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
	const [input, setInput] = useState(props.edit ? props.edit.value : "");
	const [id, setId] = useState(0);
	const giveId = () => {
		setId(id + 1);
		return id;
	};

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	});

	function handleSubmit(e) {
		e.preventDefault();

		props.onSubmit({
			id: giveId(),
			text: input,
		});
		setInput("");
	}

	function handleChange(e) {
		setInput(e.target.value);
	}

	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			{props.edit ? (
				<>
					<input
						type="text"
						placeholder="Update your todo"
						value={input}
						name="text"
						className="todo-input edit"
						onChange={handleChange}
						ref={inputRef}
					/>
					<button className="todo-button edit">Update</button>
				</>
			) : (
				<>
					<input
						type="text"
						placeholder="Type a todo"
						value={input}
						name="text"
						className="todo-input"
						onChange={handleChange}
						ref={inputRef}
					/>
					{/* <button className="todo-button">Add new todo</button> */}
				</>
			)}
			<>
				<input
					type="text"
					placeholder="Category"
					value={input}
					name="text"
					className="todo-input category"
					onChange={handleChange}
				/>
				<button className="category-button">Add new todo</button>
			</>
		</form>
	);
}

export default TodoForm;
