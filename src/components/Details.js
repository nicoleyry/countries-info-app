import '../styles/details.scss';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

const formatter = new Intl.NumberFormat('en-US', {
	maximumSignificantDigits: 3,
});

export default function Details({ countriesData }) {
	const navigate = useNavigate();
	let { selectedCountry } = useParams();
	let notAvailable = 'N/A';
	let detail = countriesData.filter((country) => country.name.common === selectedCountry)[0];
	let titleName = detail.name.common;
	let imgUrl = detail.flags.svg;
	let imgAlt = detail.flags.alt || titleName;
	let nativeName = Object.values(detail.name.nativeName).length > 0 ? Object.values(detail.name.nativeName)[0].common : titleName;
	let capital = detail.capital.length > 0 ? detail.capital : notAvailable;
	let population = (detail.population && formatter.format(detail.population)) || notAvailable;
	let topLevelDomain = detail.tld.length > 0 ? detail.tld.map((t, i, arr) => `${t}${i + 1 === arr.length ? '' : ', '}`) : notAvailable;
	let region = detail.region || notAvailable;
	let subregion = detail.subregion || notAvailable;
	let currencies =
		Object.values(detail.currencies).length > 0
			? Object.values(detail.currencies).map(
					(currency, i, arr) => `${currency.name}${i + 1 === arr.length ? '' : ', '}`
			)
			: notAvailable;

	let languages =
		Object.values(detail.languages).length > 0
			? Object.values(detail.languages).map((lang, i, arr) => `${lang}${i + 1 === arr.length ? '' : ', '}`)
			: notAvailable;

	let fullBorders = [];
	for (let i = 0; i < countriesData.length; i++) {
		for (let j = 0; j < detail.borders.length; j++) {
			if (countriesData[i].cca3 === detail.borders[j]) {
				fullBorders.push(countriesData[i].name.common);
			}
		}
	}

	let fullBordersBlock =
		fullBorders.length > 0
			? fullBorders.map((name) => 
					(<a href={`./${name}`} className='data' key={name}>
						{name}
					</a>)
			)
			: notAvailable;

	return (
		<div className='details'>
			<div className='top'>
				<div className='back-btn' onClick={() => navigate(-1)}>
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
				</div>
			</div>
			<div className='bottom'>
				<img className='img-area' src={imgUrl} alt={imgAlt} />
				<div className='info-area'>
					<h1 className='name'>{titleName}</h1>
					<div className='info'>
						<p className='title'>
							Native Name: <span className='data'>{nativeName}</span>
						</p>
						<p className='title'>
							Top Level Domain: <span className='data'>{topLevelDomain}</span>
						</p>
						<p className='title'>
							Population: <span className='data'>{population}</span>
						</p>
						<p className='title'>
							Currencies: <span className='data'>{currencies}</span>
						</p>
						<p className='title'>
							Region: <span className='data'>{region}</span>
						</p>
						<p className='title'>
							Languages: <span className='data'>{languages}</span>
						</p>
						<p className='title'>
							Sub Region: <span className='data'>{subregion}</span>
						</p>
						<p className='title'>
							Capital: <span className='data'>{capital}</span>
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
