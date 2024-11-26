import axios from 'axios';
import {
    CLASS_LIST_API_URL,
    CLASS_DETAIL_API_URL,
    GRADE_DETAIL_API_URL,
    TEACHER_DETAIL_API_URL,
    COURSE_DETAIL_API_URL,
} from '../constants/api';
//--Get All Class--//
export const fetchAllClassApi = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(CLASS_LIST_API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const classes = response.data.classAll;
    const classList = [];
    for (const classInfo of classes) {
        const courseId = classInfo.CourseId;
        const teacherId = classInfo.TeacherId;
        try {
            const [courseDetail, teacherDetail] = await Promise.all([
                axios.get(COURSE_DETAIL_API_URL(courseId), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
                axios.get(TEACHER_DETAIL_API_URL(teacherId), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            ]);
            const classItem = {
                ...classInfo,
                courseName: courseDetail.data.course.Name,
                teacherName: teacherDetail.data.teacher.Name,
            };
            classList.push(classItem);
        } catch (error) {
            console.error('Error fetching course or teacher details:', error);
        }
    }
    return classList;
};

//--Get Class Info--//
export const fetchClassByIdApi = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const classDetail = await axios.get(CLASS_DETAIL_API_URL(id), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const teacherId = classDetail.data.classDetail.TeacherId;
        const courseId = classDetail.data.classDetail.CourseId;
        const [courseDetail, teacherDetail] = await Promise.all([
            axios.get(COURSE_DETAIL_API_URL(courseId), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            axios.get(TEACHER_DETAIL_API_URL(teacherId), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        ]);
        localStorage.setItem("selectedCourse",courseDetail.data.course.Name)
        return {
            ...classDetail.data.classDetail,
            courseName: courseDetail.data.course.Name,
            teacherName: teacherDetail.data.teacher.Name,
        };
    } catch (error) {
        console.error('Error when class or course or teacher', error);
    }
};
//--Get Grade Info--//
export const fetchGradeByIdApi = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const gradeDetail = await axios.get(GRADE_DETAIL_API_URL(id), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return { ...gradeDetail.data.score, courseName:localStorage.getItem("selectedCourse") };
    } catch (error) {
        console.log('Error when fetching class or teacher or grade', error);
    }
};
