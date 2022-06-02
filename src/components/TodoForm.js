import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
	console.log(props);
	const [text, setText] = useState(props.edit ? props.edit.text : "");
	const [category, setCategory] = useState(
		props.edit ? props.edit.category : {}
	);
	const [id, setId] = useState(props.edit ? props.edit.id : 0);

	const [allCategories, setAllCategories] = useState([]);

	useEffect(() => {
		fetch("http://localhost:9292/categories")
			.then((response) => response.json())
			.then(setAllCategories);
	}, []);

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
		const obj = { text: text, category_id: category.id };
		fetch(`http://localhost:9292/todos/${id}`, {
			method: "PATCH",
			headers: {
				contentType: "application/json",
			},
			body: JSON.stringify(obj),
		});

		// props.onSubmit({
		// 	id: giveId(),
		// 	text: input,
		// });
		// setInput("");
	}

	// function handleChange(e) {
	// 	setInput({ [e.target.name]: e.target.value });
	// }

	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			{props.edit ? (
				<>
					<input
						type="text"
						placeholder="Update your todo"
						value={text}
						name="text"
						className="todo-input edit"
						onChange={(e) => setText(e.target.value)}
						ref={inputRef}
					/>
					<label for="Categories">Choose a category:</label>
					<select name="category" id="category">
						<option> -- select an option -- </option>
						{allCategories.map((category) => (
							<option value={category.id}>{category.name}</option>
						))}
					</select>
					<button className="todo-button edit">Update</button>
				</>
			) : (
				<>
					<input
						type="text"
						placeholder="Type a todo"
						value={text}
						name="todo"
						className="todo-input"
						onChange={(e) => setText(e.target.value)}
						ref={inputRef}
					/>
					<label for="Categories">Choose a category:</label>
					<select name="category" id="category">
						<option> -- select an option -- </option>
						{allCategories.map((category) => (
							<option value={category.id}>{category.name}</option>
						))}
					</select>
					<input
						type="text"
						placeholder="Category"
						value={category}
						name="category"
						className="todo-input category"
						onChange={(e) => setCategory(e.target.value)}
					/>
					<button className="todo-button">Add new todo</button>
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
