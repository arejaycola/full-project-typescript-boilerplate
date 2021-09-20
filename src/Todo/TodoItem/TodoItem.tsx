import React from 'react';
import { TodoInterface } from '../Todo';
import './TodoItem.scss';

const TodoItem = ({ todos }: { todos: TodoInterface[] }) => {
	return (
		<>
			{todos.map((todo: TodoInterface): JSX.Element => {
				return (
					<li key={todo.id}>
						<span className="todo__title">{todo.title}</span> -<span className="todo__completed">{`${todo.completed}`}</span>
					</li>
				);
			})}
		</>
	);
};
export default TodoItem;
