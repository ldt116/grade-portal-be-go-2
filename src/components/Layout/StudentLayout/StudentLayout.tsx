import Navbar from '../../Navbar/Navbar';
import Footer from './Footer.component';
import Header from './Header.component';

interface Props {
    children: React.ReactNode;
}
function StudentLayout({ children }: Props) {
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
