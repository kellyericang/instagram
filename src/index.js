import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import Header from './Header';
import Footer from './Footer';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
	<div className="index">
		<Header />
		<Board />
		<Footer />
	</div>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


