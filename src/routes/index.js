import StudentLayout from '../components/Layout/StudentLayout/StudentLayout';
import DefaultLayout from '../components/Layout/Layout';
import LandingPage from '../pages/LandingPage/LandingPage';
import HomePage from '../pages/StudentPages/HomePage';
import GradeInfo from '../pages/StudentPages/GradeInfo';
import TeacherGradeInfo from '../pages/TeacherPages/TeacherGradeInfo';
import EditForm from '../pages/AdminPages/EditForm'
import Login from '../pages/LoginPages/Login';
<<<<<<< HEAD
import AdminLogin from '../pages/LoginPages/AdminLogin';
import UserLogin from '../pages/LoginPages/UserLogin';
import TeacherHomePage from '../pages/TeacherPages/HomePage'
import TeacherCourseInfo from '../pages/TeacherPages/CourseInfo'
import TeacherGradeInfo from '../pages/TeacherPages/GradeInfo'
import TeacherCoursePage from '../pages/TeacherPages/CoursePage'
import GradeInput from '../pages/TeacherPages/GradeInput'
import AddMember from '../pages/TeacherPages/AddMember';
import AdminHomePage from '../pages/AdminPages/HomePage'
import AdminCourseInfo from '../pages/AdminPages/CourseInfo'
import AdminGradeInfo from '../pages/AdminPages/GradeInfo'
import AdminCoursePage from '../pages/AdminPages/CoursePage'

=======
import GradeInput from '../pages/TeacherPages/GradeInput';
import CourseCreate from '../pages/AdminPages/CourseCreate'
import CourseManager from '../pages/AdminPages/CourseManager'
import ClassManager from '../pages/AdminPages/ClassManager'
import ClassCreate from '../pages/AdminPages/ClassCreate';
import AddMember from '../pages/AdminPages/AddMember'
import DeleteAccount from '../pages/AdminPages/DeleteAccount';
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab
const routes = [
    {
        path: '/',
        page: LandingPage,
        layout: DefaultLayout,
        protectedRole: null,
    },
    {
        path: '/home',
        page: HomePage,
        layout: StudentLayout,
        protectedRole: null,
    },
     {
        path: '/gradeinfo',
        page: GradeInfo,
        layout: StudentLayout,
        protectedRole: 'student',
    },
         {
        path: 'teacher/gradeinfo',
        page: TeacherGradeInfo,
        layout: StudentLayout,
        protectedRole: 'teacher',
    },
        {
        path: '/class/create',
        page: ClassCreate,
        layout: StudentLayout,
        protectedRole: 'admin',
    },
    {
        path: '/teacher/gradeinput',
        page: GradeInput,
        layout: StudentLayout,
        protectedRole: 'teacher',
    },


    {
        path: '/course/:id',
        page: CourseManager,
        layout: StudentLayout,
        protectedRole: 'admin',
    },

    {
        path: '/class/:id',
        page: ClassManager,
        layout: StudentLayout,
        protectedRole: 'admin',
    },
    {
        path: '/account/add',
        page: AddMember,
        layout: StudentLayout,
        protectedRole: 'admin',
    },
    {
        path: '/account/delete',
        page: DeleteAccount,
        layout: StudentLayout,
        protectedRole: 'admin',
    },
    {
        path: '/teacher/addmember',
        page: AddMember,
    },
    {
        path: 'teacher/gradeinput',
        page: GradeInput,
    },
    {
        path: '/login',
        page: Login,
        layout: DefaultLayout,
         protectedRole: null,
    },
    {
        path: '/course/create',
        page: CourseCreate,
        layout: StudentLayout,
        protectedRole: 'admin',
    },
    {
        path: '/edit',
        page: EditForm,
        layout: StudentLayout,
protectedRole: 'admin',
    },
    

];
export default routes;
