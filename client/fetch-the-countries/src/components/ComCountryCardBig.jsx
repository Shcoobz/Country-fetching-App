import ComBackBtn from './Buttons/ComBackBtn';

function CountryInfoItem({ label, value }) {
  return (
    <div className='info-item'>
      <p className='info-label'>{label}</p>
      <p className='info-value'>{value}</p>
    </div>
  );
}

function ComCountryCardBig({ country, onBack }) {
  return (
    <div>
      <div className='country-container'>
        <h2>{country.name.common}</h2>
        <div className='flag'>
          <img src={country.flags.svg} alt='flag' style={{ width: '500px' }} />
        </div>
        <div className='country-info'>
          <CountryInfoItem
            label='Official Name:'
            value={country.name.official}
          />
          <CountryInfoItem label='Region:' value={country.region} />
          <CountryInfoItem label='Sub Region:' value={country.subregion} />
          <CountryInfoItem
            label='Capital:'
            value={country.capital && country.capital[0]}
          />
          <CountryInfoItem label='Area:' value={country.area + ' sq km'} />
          <CountryInfoItem label='Population:' value={country.population} />
          <CountryInfoItem
            label='Currency:'
            value={Object.values(country.currencies)[0].name}
          />
          <CountryInfoItem
            label='Timezones:'
            value={country.timezones && country.timezones.join(', ')}
          />
          <CountryInfoItem label='Continent:' value={country.continents[0]} />
        </div>
      </div>
      <ComBackBtn onClick={onBack} />
    </div>
  );
}

export default ComCountryCardBig;
