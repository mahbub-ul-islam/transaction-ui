import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrlService} from '../../../core/services/api-url.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrl: './batch.component.css'
})
export class BatchComponent {

    message: string | null = null;
    isSuccess: boolean | null = null;

    constructor(private apiUrlService: ApiUrlService, private http: HttpClient) {}

    onRunBatch() {
        const apiUrl = this.apiUrlService.getRunBatchJobUrl();

        this.http.post(apiUrl, {}, { responseType: 'text' })
            .subscribe(
                (response) => {
                    this.isSuccess = true;
                    this.message = 'Batch Job Completed: ' + response;
                },
                (error) => {
                    this.isSuccess = false;
                    this.message = 'Error running batch job: ' + error.message;
                }
            );
    }
}
