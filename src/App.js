import { useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import Content from './components/Content';

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	return (
		<div className={`App ${darkMode ? 'dark' : ''}`}>
			<div className="nav">
				<Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
			</div>
			<div className="body">
				<Content searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
		</div>
	);
}

export default App;
