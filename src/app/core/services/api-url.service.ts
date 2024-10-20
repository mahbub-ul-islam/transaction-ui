import {Injectable} from '@angular/core';
import {ApiUrls} from '../config/api-urls';


@Injectable({
    providedIn: 'root'
})
export class ApiUrlService {

    getAuthRegisterUrl(): string {
        return ApiUrls.auth.register;
    }

    getAuthLoginUrl(): string {
        return ApiUrls.auth.login;
    }

    getTransactionByIdUrl(id: number): string {
        return ApiUrls.transactions.getById(id);
    }

    getUpdateTransactionUrl(id: number): string {
        return ApiUrls.transactions.update(id);
    }

    getListTransactionsUrl(): string {
        return ApiUrls.transactions.list;
    }

    getRunBatchJobUrl(): string {
        return ApiUrls.transactions.batch;
    }
}
