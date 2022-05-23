import './LoadingAnimation.css'


const LoadingAnimation = () => {
	return (
		<div className='loading-bg-cover'>
			<img className="loading" src={`${process.env.PUBLIC_URL}/image/loading.png`} />
			<p className='loadingText'>Loading...</p>
		</div>
	)
}

export default LoadingAnimation