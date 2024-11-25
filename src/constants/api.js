//List all api in this project
const ADMIN_API_URL = 'https://dacnpm.thaily.id.vn/admin/api';
const CLIENT_API_URL = 'https://dacnpm.thaily.id.vn/api';


export const LECTURER_LIST_API_URL = `${ADMIN_API_URL}/lecturers`;
export const LECTURER_DETAIL_API_URL = (id) => `${ADMIN_API_URL}/lecturers/${id}`;
//----Start API for Class List of Student----//
export const CLASS_LIST_API_URL = `${CLIENT_API_URL}/class/account`
export const CLASS_DETAIL_API_URL = (id) => `${CLIENT_API_URL}/class/${id}`
export const GRADE_DETAIL_API_URL = (id) => `${CLIENT_API_URL}/resultScore/${id}`
export const TEACHER_DETAIL_API_URL = (id) => `${CLIENT_API_URL}/${id}`
export const COURSE_DETAIL_API_URL = (id) => `${CLIENT_API_URL}/course/${id}`
//----End API for Class List of Student----//
export const ADMIN_LOGIN = `${ADMIN_API_URL}/login`