import Header from './StudentLayout/Header.component';
import Footer from './StudentLayout/Footer.component';
interface Props {
    children: React.ReactNode
}
function Layout({ children }: Props) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
