function ComLearnMoreBtn({ onClick, country }) {
  return (
    <button className='learn-more-btn' onClick={() => onClick(country)}>
      Learn More
    </button>
  );
}

export default ComLearnMoreBtn;
