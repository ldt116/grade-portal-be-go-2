import Search from "../../components/GradeSearch/GradeSearch";
import Table from "../../components/GradeTable/GradeTable";

function AdminSearch() {
  return (
    <div className="mt-40 w-full px-9">
      <div className="text-[5rem] py-4 px-20 text-center">Tìm kiếm lớp học</div>
      {/* Centering the GradeSearch */}
      <div className="flex justify-center w-full mt-7">
        <div className="w-2/3">
          <Search />
        </div>
      </div>
      <div className="w-full mt-7 mb-10">
        {/* Added margin-bottom (mb-10) for space between GradeTable and footer */}
        <Table />
      </div>
      <footer className="w-full py-4 text-center">
        {/* Footer content goes here */}
        
      </footer>
    </div>
  );
}

export default GradeInfo;
