import Header from "../LoginPages/HeaderFooter/Header";
import Footer from "../LoginPages/HeaderFooter/Footer";
import Navbar from "../../components/Navbar/Navbar";
import background from '../../assets/img/landingPic.jpg'

function HomePage() {
    return (
        <div>
            <Header/>
            <Navbar/>

            <div className="flex-grow">
                <img src={background} alt="hehehe" />
            </div>
            <Footer/>
        </div>
    );
}

export default HomePage;