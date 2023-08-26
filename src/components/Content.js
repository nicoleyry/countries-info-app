import { useState, cloneElement } from 'react';
import '../styles/content.scss';

export default function Navbar({ searchValue, setSearchValue }) {
	const [open, setOpen] = useState(false);

	const handleMenu = (e) => {
		// console.log(e);
	};

	let searchHandler = (e) => {
		e.preventDefault();
		console.log(e);
	};

	let typeHandler = (e) => {
		setSearchValue(e.target.value);
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
					trigger={<button className={`dropdown-btn ${open ? 'open' : ''}`}>Filter by Region</button>}
					menu={[
						<input type='button' value="Africa" onClick={handleMenu}/>,
						<input type='button' value="America" onClick={handleMenu}/>,
						<input type='button' value="Asia" onClick={handleMenu}/>,
						<input type='button' value="Asia" onClick={handleMenu}/>,
						<input type='button' value="Oceania" onClick={handleMenu}/>
					]}
				/>
			</div>
		</div>
	);
};

const Dropdown = ({ trigger, menu, open, setOpen }) => {
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
									console.log(e.target.value);
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
