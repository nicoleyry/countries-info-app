import '../styles/card.scss';

export default function Card(props) {
	let clickHandler = (name) => {
		console.log(name);
	};
	return(
		<div className='card' onClick={(e) => clickHandler(props.name)}>
			<div className='img-area' style={{backgroundImage: `url(${props.flag})`}}></div>
			<div className='detail'>
				<p className='name'>{props.name}</p>
				<p className='title'>Population: <span className='data'>{props.population}</span></p>
				<p className='title'>Region: <span className='data'>{props.region}</span></p>
				<p className='title'>Capital: <span className='data'>{props.capital}</span></p>
			</div>
		</div>
	);
};