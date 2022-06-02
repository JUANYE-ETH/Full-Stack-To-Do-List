import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
	console.log(props);
	const [id, text, category] = props.editObject.edit
		? props.editObject
		: { id: "", text: "", category: {} };

	const [input, setInput] = useState({
		id: id,
		text: text,
		category: category,
	});

	// const [id, setId] = useState(0);
	// const giveId = () => {
	// 	setId(id + 1);
	// 	return id;
	// };

	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	function handleSubmit(e) {
		e.preventDefault();

		// props.onSubmit({
		// 	id: giveId(),
		// 	text: input,
		// });
		// setInput("");
	}

	function handleChange(e) {
		setInput({ [e.target.name]: e.target.value });
	}

	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			{props.edit ? (
				<>
					<input
						type="text"
						placeholder="Update your todo"
						value={input.text || props.editObject.text}
						name="text"
						className="todo-input edit"
						onChange={handleChange}
						ref={inputRef}
					/>
					<input
						type="text"
						placeholder="Category"
						value={input.category}
						name="category"
						className="todo-input category"
						onChange={handleChange}
					/>
					<button className="todo-button edit">Update</button>
				</>
			) : (
				<>
					<input
						type="text"
						placeholder="Type a todo"
						value={input.todo}
						name="todo"
						className="todo-input"
						onChange={handleChange}
						ref={inputRef}
					/>
					<input
						type="text"
						placeholder="Category"
						value={input.category}
						name="category"
						className="todo-input category"
						onChange={handleChange}
					/>
					<button className="todo-button">Add new todo</button>
					{/* <button className="todo-button">Add new todo</button> */}
				</>
			)}
			{/* <input
				type="text"
				placeholder="Category"
				value={input}
				name="text"
				className="todo-input category"
				onChange={handleChange}
			/>
			<button className="todo-button">Add new todo</button> */}
		</form>
	);
}

export default TodoForm;
