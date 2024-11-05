import landingImg from '../../assets/img/land-img.svg';

function HomePage() {
    return (
        <div className="mt-[164px]">
            <img src={landingImg} alt='landing-img' className='w-full'></img>
        </div>
    );
}

export default HomePage;