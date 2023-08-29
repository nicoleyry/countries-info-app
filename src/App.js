import { useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Details from './components/Details';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	return (
		<div className={`App ${darkMode ? 'dark' : ''}`}>
			<div className='nav'>
				<Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
			</div>
			<div className='body'>
				<Router>
					<Routes>
						<Route
							path='/'
							element={<Content searchValue={searchValue} setSearchValue={setSearchValue} />}
						/>
						<Route path='/details' element={<Details />} />
					</Routes>
				</Router>
			</div>
		</div>
	);
}

export default App;
