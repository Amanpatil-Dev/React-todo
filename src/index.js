import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import TodoProvider from './todo/TodoProvider'

ReactDOM.render(<TodoProvider><App/></TodoProvider> , document.getElementById('root'));
