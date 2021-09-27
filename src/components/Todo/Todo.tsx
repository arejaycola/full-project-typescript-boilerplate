import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import './Todo.scss';

export interface TodoInterface {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

const Todo = () => {
	const [todos, setTodos] = useState<TodoInterface[]>([]);

	useEffect(() => {
		let mounted = true; // code to get rid of unmounting error.
		const fetchTodos = async (): Promise<void> => {
			const response: AxiosResponse = await axios.get('https://jsonplaceholder.typicode.com/todos');
			if (mounted) {
				setTodos(response.data);
			}
		};

		fetchTodos();

		return () => {
			mounted = false;
		};
	}, []);

	const onTodoItemClick = (id: number): void => {
		const temp = todos.filter((todo: TodoInterface): boolean => todo.id !== id);

		setTodos([...temp]);
	};

	return (
		<div>
			<h1>Todo List (Click to delete)</h1>
			<ul>
				{todos.map(
					(todo: TodoInterface): JSX.Element => (
						<li
							key={todo.id}
							onClick={(): void => {
								onTodoItemClick(todo.id);
							}}
						>
							<span className="todo__title">{todo.title}</span> -<span className="todo__completed">{`${todo.completed}`}</span>
						</li>
					)
				)}
			</ul>
		</div>
	);
};
export default Todo;
