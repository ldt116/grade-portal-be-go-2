import GradeSearch from "./Search";
import GradeTable from "./Table";
import Header from "../../components/Layout/StudentLayout/Header.component";
import Footer from "../../components/Layout/StudentLayout/Footer.component";

function AdminSearch() {
  return (
    
    <div className="mt-40 w-full px-9">
    <Header/>
      <div className="text-[5rem] py-4 px-20 text-center">Tìm kiếm lớp học</div>
      {/* Centering the GradeSearch */}
      <div className="flex justify-center w-full mt-7">
        <div className="w-2/3">
          <GradeSearch/>
        </div>
      </div>
      <div className="w-full mt-7 mb-10">
        {/* Added margin-bottom (mb-10) for space between GradeTable and footer */}
        <GradeTable/>
      </div>
      <footer className="w-full py-4 text-center">
        {/* Footer content goes here */}
        
      </footer>
      <Footer/>
    </div>

  );
}

export default AdminSearch;
