import '../styles/card.scss';

export default function Card(props) {
	const formatter = new Intl.NumberFormat('en-US', {
		maximumSignificantDigits: 3
	});

	return(
		<div className='card' onClick={() => props.onClick(props.name)}>
			<a href={`/${props.name}`}>
				<div className='img-area' style={{backgroundImage: `url(${props.flag})`}}></div>
				<div className='detail'>
					<p className='name'>{props.name}</p>
					<p className='title'>Population: <span className='data'>{formatter.format(props.population)}</span></p>
					<p className='title'>Region: <span className='data'>{props.region}</span></p>
					<p className='title'>Capital: <span className='data'>{props.capital}</span></p>
				</div>
			</a>
		</div>
	);
};