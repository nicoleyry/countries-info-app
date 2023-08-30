import { useState, cloneElement, useEffect } from 'react';
import '../styles/content.scss';
import Card from './Card';

export default function Content({ setSelectedCountry, searchValue, setSearchValue, countriesData }) {
	let cardsPerShow = 8;
	const [cardsToShow, setCardsToShow] = useState(cardsPerShow);
	const [filterRegion, setFilterRegion] = useState('');
	const [open, setOpen] = useState(false);
	const [noResult, setNoResult] = useState(false);
	let [filteredData, setFilteredData] = useState(countriesData.filter((country) => country.region === filterRegion));

	let allRegionData = [];
	for (const [key, val] of Object.entries(countriesData)) {
		allRegionData[key] = val.region;
	}
	let regionData = allRegionData.filter((value, index, array) => array.indexOf(value) === index);
	const handleMenu = () => {};
	let menu = regionData.map((region) => <input type='button' value={region} onClick={handleMenu} />);

	// Dropdown filter data
	useEffect(() => {
		setFilteredData(countriesData.filter((country) => country.region === filterRegion));
	}, [countriesData, filterRegion]);

	// Search for data
	useEffect(() => {
		let searchParam = searchValue.charAt(0).toUpperCase() + searchValue.slice(1); // capitalize search param
		let result = countriesData.filter((country) => country.name.common.includes(searchParam));
		setFilteredData(result);
		setFilterRegion('');
		result.length === 0 ? setNoResult(true) : setNoResult(false);
	}, [countriesData, searchValue]);

	let searchHandler = (e) => {
		e.preventDefault();
	};

	let typeHandler = (e) => {
		setSearchValue(e.target.value);
	};

	let showMoreHandler = () => {
		setCardsToShow((n) => n + cardsPerShow);
	};

	let createCard = (countriesData) => {
		return (
			<Card
				key={countriesData.cca2}
				name={countriesData.name.common}
				population={countriesData.population}
				flag={countriesData.flags.svg}
				region={countriesData.region}
				capital={countriesData.capital}
				onClick={(name) => setSelectedCountry(name)}
			/>
		);
	};

	return (
		<div className='content'>
			<div className='top-area'>
				<form className='search-container' method='post' onSubmit={searchHandler}>
					<button className='search-btn' type='submit'>
						Search
					</button>
					<input
						className='search-input'
						type='text'
						value={searchValue}
						onChange={(e) => typeHandler(e)}
						placeholder='Search for a country...'
						onClick={() => setSearchValue('')}
					/>
				</form>
				<Dropdown
					open={open}
					setOpen={setOpen}
					setFilterRegion={setFilterRegion}
					trigger={
						<button className={`dropdown-btn ${open ? 'open' : ''}`}>
							{filterRegion.length === 0 ? 'Filter by Region' : filterRegion}
						</button>
					}
					menu={menu}
				/>
			</div>
			<div className='result-area'>
				{!noResult && filterRegion.length === 0 && searchValue.length === 0
					? countriesData.slice(0, cardsToShow).map(createCard)
					: filteredData.slice(0, cardsToShow).map(createCard)}
				{noResult && <p className='msg'>No results for "{searchValue}"</p>}
			</div>
			{!noResult && (filteredData.length > cardsToShow) && (
				<div className='show-more' onClick={showMoreHandler}>
					<p>Show More</p>
				</div>
			)}
		</div>
	);
}

const Dropdown = ({ trigger, menu, open, setOpen, setFilterRegion }) => {
	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<div className='dropdown'>
			{cloneElement(trigger, {
				onClick: handleOpen,
			})}
			{open ? (
				<ul className='menu'>
					{menu.map((menuItem, index) => (
						<li key={index} className='menu-item'>
							{cloneElement(menuItem, {
								onClick: (e) => {
									setFilterRegion(e.target.value);
									menuItem.props.onClick();
									setOpen(false);
								},
							})}
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};