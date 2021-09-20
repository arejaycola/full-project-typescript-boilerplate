import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import './Todo.scss';
import TodoItem from './TodoItem/TodoItem';

export interface TodoInterface {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

const Todo = () => {
	const [todos, setTodos] = useState<TodoInterface[]>([]);

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
				<TodoItem todos={todos} />
			</ul>
		</div>
	);
};
export default Todo;
