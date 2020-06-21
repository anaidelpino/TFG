import React from 'react';
import ReactDOM from 'react-dom';
import { Drizzle } from 'drizzle';
import { DrizzleContext } from "drizzle-react";
import './index.css';
import './App.css';
import App from './App';
import drizzleOptions from "./drizzle";
//import Navbar from './components/Navbar'




const drizzle = new Drizzle(drizzleOptions);

ReactDOM.render(
	<DrizzleContext.Provider drizzle={drizzle}>
		<App />
	</DrizzleContext.Provider>,
	document.getElementById('root')
);