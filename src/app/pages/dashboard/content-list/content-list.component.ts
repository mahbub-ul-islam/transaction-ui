import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrlService} from '../../../core/services/api-url.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.css'
})
export class ContentListComponent implements OnInit{

    transactions: any [] = [];
    filterObj = {
        "customerId": "",
        "accountNumber": "",
        "description": "",
        "page": 0,
        "size": 10
    }

    constructor(private http: HttpClient, private apiUrlService: ApiUrlService,) {
    }

    ngOnInit(): void {
        this.filterTransactions();
    }


    filterTransactions() {
        const apiUrl = this.apiUrlService.getListTransactionsUrl();
        this.http.post(apiUrl, this.filterObj).subscribe((res: any) => {
            this.transactions = res.content;
        })
    }

    onPrevious() {
        this.filterObj.page = this.filterObj.page - 1;
        this.filterTransactions();
    }

    onNext() {
        this.filterObj.page = this.filterObj.page + 1;
        this.filterTransactions();
    }
}
