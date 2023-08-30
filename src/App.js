import { useEffect, useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Details from './components/Details';
import staticCountriesData from './data.json';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [selectedCountry, setSelectedCountry] = useState('');
	const [countriesData, setCountriesData] = useState(staticCountriesData);
	let apiURL = 'https://restcountries.com/v3.1/all';
	let param = 'name,tld,cca2,cca3,capital,subregion,region,population,nativeName,currencies,languages,flags,borders';

	useEffect(() => {
		axios.get(`${apiURL}?fields=${param}`).then((response) => {
			let data = [...response.data].sort((a, b) => a.name.common > b.name.common ? 1 : -1);
			setCountriesData(data);
		}).catch(err => {
			console.log(err);
		});
	}, []);

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
