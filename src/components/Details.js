import '../styles/details.scss';
import { useParams } from 'react-router';

const formatter = new Intl.NumberFormat('en-US', {
	maximumSignificantDigits: 3,
});

export default function Details({ countriesData }) {
	let { selectedCountry } = useParams();
	let notAvailable = 'N/A';
	let detail = countriesData.filter((country) => country.name === selectedCountry)[0];
	let currencies = detail.currencies
		? detail.currencies.map((currency, i, arr) => {
				return `${currency.name}${i + 1 === arr.length ? '' : ', '}`;
		})
		: notAvailable;

	let languages = detail.languages
		? detail.languages.map((lang, i, arr) => {
				return `${lang.name}${i + 1 === arr.length ? '' : ', '}`;
		})
		: notAvailable;

	let fullBorders = [];
	if(detail.borders) {
		for (let i = 0; i < countriesData.length; i++) {
			for (let j = 0; j < detail.borders.length; j++) {
				if (countriesData[i].alpha3Code === detail.borders[j]) {
					fullBorders.push(countriesData[i].name);
				}
			}
		}
	}

	let fullBordersBlock = fullBorders.length > 0
		? fullBorders.map((name) => (
				<span className='data' key={name}>
					{name}
				</span>
		))
		: notAvailable;

	return (
		<div className='details'>
			<div className='top'>
				<a className='back-btn' href='/'>
					<svg width='15' xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'>
						<path
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='48'
							d='M244 400L100 256l144-144M120 256h292'
						/>
					</svg>
					<p>Back</p>
				</a>
			</div>
			<div className='bottom'>
				<img className='img-area' src={detail.flag} alt='detail.name' />
				<div className='info-area'>
					<h1 className='name'>{detail.name}</h1>
					<div className='info'>
						<p className='title'>
							Native Name: <span className='data'>{detail.nativeName || notAvailable}</span>
						</p>
						<p className='title'>
							Top Level Domain: <span className='data'>{detail.topLevelDomain || notAvailable}</span>
						</p>
						<p className='title'>
							Population:
							<span className='data'>
								{(detail.population && formatter.format(detail.population)) || notAvailable}
							</span>
						</p>
						<p className='title'>
							Currencies: <span className='data'>{currencies}</span>
						</p>
						<p className='title'>
							Region: <span className='data'>{detail.region || notAvailable}</span>
						</p>
						<p className='title'>
							Languages: <span className='data'>{languages}</span>
						</p>
						<p className='title'>
							Sub Region: <span className='data'>{detail.subregion || notAvailable}</span>
						</p>
						<p className='title'>
							Capital: <span className='data'>{detail.capital || notAvailable}</span>
						</p>
					</div>
					<div className='border-info'>
						<span className='title'>Border Countries:</span>
						<div className='border-data'>{fullBordersBlock}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
