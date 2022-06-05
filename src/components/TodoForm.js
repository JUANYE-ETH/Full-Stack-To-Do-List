import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function TodoForm(props) {
	// console.log(props);
	const [text, setText] = useState(props.edit ? props.edit.text : "");
	const [category, setCategory] = useState(
		props.edit ? props.edit.category : {}
	);
	const [id, setId] = useState(props.edit ? props.edit.id : "");
	const [todos, setTodos] = useState([]);
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

	const handleCategoryChange = (e) => {
		// debugger
		setCategory((preState) => ({ ...preState, id: e.target.value }));
	};
	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	function handleSubmit(e) {
		// e.preventDefault();
		// debugger
		// const obj = { text: text, category_id: category.id };
		fetch(`http://localhost:9292/todos/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text: text, category_id: category.id }),
		});

		// props.onSubmit({
		// 	id: giveId(),
		// 	text: input,
		// });
		// setInput("");
	}

	function addTodo(e) {
		// debugger
		// e.preventDefault();
		fetch("http://localhost:9292/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text: text,
				category_id: category.id,
			}),
		})
			.then((r) => r.json())
			.then((todos) => setTodos(todos));
		// if (!todo.text || /^\s*$/.test(todo.text)) {
		// 	return;
		// }
		// const newTodos = [todo, ...todos];

		// setTodos(newTodos);
	}

	// function handleChange(e) {
	// 	setInput({ [e.target.name]: e.target.value });
	// }

	return (
		<header>
			<nav>
				{/* <Link className="todo-button" to="categories/new">Add Category</Link> */}
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
							<select
								name="category"
								id="category"
								onChange={(e) => handleCategoryChange(e)}
							>
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
							<select
								name="category"
								id="category"
								onChange={(e) => handleCategoryChange(e)}
							>
								<option> -- select an option -- </option>
								{allCategories.map((category) => (
									<option value={category.id}>{category.name}</option>
								))}
							</select>

							{/* <input
						type="text"
						placeholder="Category"
						value={category}
						name="category"
						className="todo-input category"
						onChange={(e) => setCategory(e.target.value)}
					/> */}
							<button onClick={addTodo} className="todo-button">
								Add new todo
							</button>
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
			</nav>
		</header>
	);
}

export default TodoForm;
