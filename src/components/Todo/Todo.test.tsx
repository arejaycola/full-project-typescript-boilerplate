import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from './Todo';

test('renders todo list title correctly', () => {
	render(<Todo />);

	const title = screen.queryByText('Todo List');
	expect(title).toBeInTheDocument();
});

test('renders to return 3 todos', async () => {
	render(<Todo />);

	const listItems = await screen.findAllByRole('listitem');

	expect(listItems.length).toBe(3);
});

test('removes element from list on click', async () => {
	render(<Todo />);

	const listItems = await screen.findAllByRole('listitem');

	userEvent.click(listItems[1]);

	const smallerListItems = await screen.findAllByRole('listitem');
	expect(smallerListItems.length).toBe(2);
});
