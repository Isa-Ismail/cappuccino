const Banner = () => {
  return (
    <div>
        <h1 className='flex flex-col'>
            <span style={{fontWeight:'800', color: 'brown'}}>Coffee </span>
            <span style={{fontWeight:'800', color: '#888160d7'}}>Connoisseur</span>
        </h1>
        <p>
          Find local coffee stores nearby
        </p>
        <button style ={{color: 'white', backgroundColor: 'blue', padding: '1rem 1rem', marginTop: '3rem'}}>
            View stores nearby
        </button>
    </div>
  )
}

export default Banner