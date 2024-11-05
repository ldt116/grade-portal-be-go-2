import Header from './StudentLayout/Header.component';
import Footer from './StudentLayout/Footer.component';

function Layout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
