import './Animation.css'


const Animation = () => {
	return (
		<div className='bg-cover'>
			<img className="pokeball" src={`${process.env.PUBLIC_URL}/image/pokeball.png`} />
			<p>Försöker fånga....</p>
		</div>
	)
}

export default Animation