import TripPlanner from '../components/TripPlanner';
import video from '../assets/home_video.mp4';
import '../styles/home.css'
import Footer from '../components/Footer';
const Home = () => {
    console.log("this is home page!");
    
    return (
        <div className="video-container">
            <video autoPlay loop muted className="video-background">
                <source src={video} type="video/mp4" />
            </video>
            <div className='main_info'>
                <h1>Trusted by 60,000+ Enchanted Travelers</h1>
                <h2>Let Our Experts Plan Your Private, Tailor-Made and Secure Tour in 70+ Inspiring Destinations.</h2>
            </div>
            <div className="containerHome">
            <TripPlanner/>
            </div>
            <div>
            <Footer/>
            </div>
        </div>
    );
}

export default Home