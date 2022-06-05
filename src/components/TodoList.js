import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import CategoryForm from "./CategoryForm";

function TodoList({handleSubmit}) {
	const [todos, setTodos] = useState([]);
	// const [category, setCategory] = useState(
	// 	props.edit ? props.edit.category : {}
	// );
	// const [id, setId] = useState(props.edit ? props.edit.id : "");
	const [text, setText] = useState("")
	const [category, setCategory] = useState("")
	

	useEffect(() => {
		fetch("http://localhost:9292/todos")
			.then((res) => res.json())
			.then((todos) => setTodos(todos));
	}, []);

	function addTodo(todo, e) {
		debugger
		e.preventDefault();
    fetch("http://localhost:9292/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        category_id: category.id
      }),
    })
      .then((r) => r.json())
      .then((data) => setTodos(data));
		// if (!todo.text || /^\s*$/.test(todo.text)) {
		// 	return;
		// }
		// const newTodos = [todo, ...todos];

		// setTodos(newTodos);
	}

	function updateTodo(todoId, newValue) {
		if (!newValue.text || /^\s*$/.test(newValue.text)) {
			return;
		}
		setTodos((prev) =>
			prev.map((item) => (item.id === todoId ? newValue : item))
		);
	}

	const [editObject, setEditObject] = useState({ edit: false });

	function removeTodo(id, e) {
		// e.preventDefault();
		fetch(`http://localhost:9292/todos/${id}`, {
			method: 'DELETE',
		})
		.then(response => response.json())
		.then(data => setTodos(data))
		// const removeArr = [...todos].filter((todo) => todo.id !== id);

		// setTodos(removeArr);
	}

	const completeTodo = (id) => {
		let updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.isComplete = !todo.isComplete;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	return (
		<div>
			<h1>What's the agenda for Today?</h1>
			<CategoryForm 
				onSubmit={handleSubmit}/>
			<TodoForm
				updateTodo={updateTodo}
				editObject={editObject}
				onSubmit={addTodo}
			/>
			<Todo
				setEditObject={setEditObject}
				todos={todos}
				completeTodo={completeTodo}
				removeTodo={removeTodo}
			/>
		</div>
	);
}

export default TodoList;
