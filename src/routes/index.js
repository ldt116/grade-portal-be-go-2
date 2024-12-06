import StudentLayout from '../components/Layout/StudentLayout/StudentLayout';
import DefaultLayout from '../components/Layout/Layout';
import LandingPage from '../pages/LandingPage/LandingPage';
import HomePage from '../pages/StudentPages/HomePage';
import GradeInfo from '../pages/StudentPages/GradeInfo';
import TeacherGradeInfo from '../pages/TeacherPages/TeacherGradeInfo';
import Login from '../pages/LoginPages/Login';
import GradeInput from '../pages/TeacherPages/GradeInput';
import ClassCreate from '../pages/AdminPages/ClassCreate';
import EditForm from '../pages/AdminPages/EditForm';
const routes = [
    {
        path: '/',
        page: LandingPage,
        layout: DefaultLayout,
    },
    {
        path: '/home',
        page: HomePage,
        layout: StudentLayout,
    },
     {
        path: '/gradeinfo',
        page: GradeInfo,
        layout: StudentLayout,
    },
         {
        path: 'teacher/gradeinfo',
        page: TeacherGradeInfo,
        layout: StudentLayout,
    },
    {
        path: 'teacher/gradeinput',
        page: GradeInput,
        layout: StudentLayout,
    },
    {
        path: '/login',
        page: Login,
        layout: DefaultLayout,
    },
    {
        path: '/classcreate',
        page: ClassCreate,
        layout: DefaultLayout,
    },
    {
        path: '/edit',
        page: EditForm,
        layout: StudentLayout,
    },
    

];
export default routes;
