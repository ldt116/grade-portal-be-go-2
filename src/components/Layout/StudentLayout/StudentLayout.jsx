import Navbar from '../../Navbar/Navbar';
import Footer from './Footer.component';
import Header from './Header.component';

function StudentLayout({ children }) {
    return (
        <div>
            <Header />
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
export default StudentLayout;
