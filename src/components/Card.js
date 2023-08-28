import '../styles/card.scss';

export default function Card(props) {
	return(
		<div className='card'>
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