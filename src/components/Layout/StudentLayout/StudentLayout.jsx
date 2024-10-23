import Footer from './Footer.component';
import Header from './Header.component';
function StudentLayout({ children }) {
    return (
        <div className="flex flex-col justify-center">
            <div className="min-h-screen bg-bgColor">
                <Header />
                {children}
            </div>
            <Footer />
        </div>
    );
}
export default StudentLayout;
