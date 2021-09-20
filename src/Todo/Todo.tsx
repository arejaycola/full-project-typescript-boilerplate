import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

interface TodoInterface {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

const Todo = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async (): Promise<void> => {
		const response: AxiosResponse = await axios.get('https://jsonplaceholder.typicode.com/todos');
		setTodos(response.data);
	};

	return (
		<div>
			<h1>Todo List</h1>
			<ul>
				{todos.map((todo: TodoInterface): JSX.Element => {
					return (
						<li key={todo.id}>
							{todo.title} - {`${todo.completed}`}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default Todo;
