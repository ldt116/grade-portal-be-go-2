//List all api in this project
export const ADMIN_API_URL = 'https://dacnpm.thaily.id.vn/admin/api';
export const CLIENT_API_URL = 'https://dacnpm.thaily.id.vn/api';


export const LECTURER_LIST_API_URL = `${ADMIN_API_URL}/lecturers`;
export const LECTURER_DETAIL_API_URL = (id) => `${ADMIN_API_URL}/lecturers/${id}`;
//----Start API for Class List of Student----//
//----End API for Class List of Student----//
export const ADMIN_LOGIN = `${ADMIN_API_URL}/login`
export const CLIENT_LOGIN = `${CLIENT_API_URL}/login`
