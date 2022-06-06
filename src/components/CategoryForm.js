import { useState } from "react";

const CategoryForm = ({ onAddCategory }) => {
	const [formData, setFormData] = useState({
		name: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	const handleSubmit = (e) => {
		// e.preventDefault();
		alert("Added to the list!");
		const configObj = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ ...formData }),
		};

		fetch("http://localhost:9292/categories", configObj)
			.then((resp) => resp.json())
			.then((category) => {
				onAddCategory(category);
				setFormData({
					name: "",
				});
			});
	};

	return (
		<section>
			<form className="form" autoComplete="off" onSubmit={handleSubmit}>
				<input
					type="text"
					id="category-input"
					name="name"
					placeholder="Type new category"
					onChange={handleChange}
					value={formData.name}
				/>

				<button type="submit" class="category-button">
					Add new category to list
				</button>
			</form>
		</section>
	);
};

export default CategoryForm;
