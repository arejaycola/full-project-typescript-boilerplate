import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './components/Todo/Todo';

import './styles/style.scss';

ReactDOM.render(
	<React.StrictMode>
		<Todo />
	</React.StrictMode>,
	document.getElementById('root')
);

