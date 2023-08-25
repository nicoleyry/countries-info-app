import { useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar';

function App() {
	const [darkMode, setDarkMode] = useState(false);

	return (
		<div className={`App ${darkMode ? 'dark' : ''}`}>
			<div className="nav">
				<Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
			</div>
			<div className="content">
				<h1>Content</h1>
			</div>
		</div>
	);
}

export default App;
