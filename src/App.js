import { useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Details from './components/Details';
import countriesData from './data.json';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [selectedCountry, setSelectedCountry] = useState('');

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
							element={
								<Content
									selectedCountry={selectedCountry}
									setSelectedCountry={setSelectedCountry}
									searchValue={searchValue}
									setSearchValue={setSearchValue}
									countriesData={countriesData}
								/>
							}
						/>
						<Route path='/:selectedCountry' element={<Details countriesData={countriesData} />} />
					</Routes>
				</Router>
			</div>
		</div>
	);
}

export default App;
