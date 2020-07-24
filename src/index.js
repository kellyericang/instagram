import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import Header from './Header';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
	<div>
		<Header />
		<h2 className="heading">Instagram</h2>
		<p>Here are some of the crafts that I have made and posted on my Instagram, you can follow me at <a href="https://www.instagram.com/kellycraftng/">@kellycraftng</a> if you want to stay updated! I like to dabble in a number of different crafts but specialize in papercutting and card-making. I'm open for commissions via DM on Instagram!</p>
		<Board />
	</div>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


