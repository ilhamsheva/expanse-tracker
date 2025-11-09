export const BASE_URL = 'http://localhost:8000';

export const API_PATH = {
    AUTH: {
        LOGIN: '/api/v1/auth/login',
        SIGNUP: '/api/v1/auth/register',
        GET_USER_INFO: '/api/v1/auth/getUser'
    },
    INCOME: {
        ADD_INCOME: '/api/v2/income/add',
        GET_INCOME: '/api/v2/income/get',
        DELETE_INCOME: '/api/v2/income/delete',
        DOWNLOAD_EXCEL: '/api/v2/income/download-excel',
    },
    EXPENSE: {
        ADD_EXPENSE: '/api/v3/expense/add',
        GET_EXPENSE: '/api/v3/expense/get',
        DELETE_EXPENSE: '/api/v3/expense/delete',
        DOWNLOAD_EXCEL: '/api/v3/expense/download-excel'
    },
    DASHBOARD: {
        GET_DASHBOARD: '/api/v4/dashboard/getDashboard'
    },
    UPLOAD: {
        UPLOAD_IMAGE: '/api/v1/auth/upload-image',
    }
}