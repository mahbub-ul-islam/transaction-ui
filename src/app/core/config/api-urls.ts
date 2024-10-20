import {environment} from '../../../environments/environment';


export const ApiUrls = {
    auth: {
        register: `${environment.apiUrl}/auth/register`,
        login: `${environment.apiUrl}/auth/login`,
    },
    transactions: {
        getById: (id: number) => `${environment.apiUrl}/transactions/${id}`,
        update: (id: number) => `${environment.apiUrl}/transactions/${id}`,
        list: `${environment.apiUrl}/transactions/page`,
        batch: `${environment.apiUrl}/transactions/batch-jobs`,
    }
};
