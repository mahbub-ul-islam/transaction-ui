import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ApiUrlService} from '../../../core/services/api-url.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{

    form: FormGroup;
    id: number | undefined;

    constructor(
        private fb: FormBuilder,
        private apiUrlService: ApiUrlService,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) {
        this.form = this.fb.group({
            customerId: new FormControl('', [Validators.required]),
            accountNumber: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            trxAmount: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
            trxDate: new FormControl('', [Validators.required]),
            trxTime: new FormControl('', [Validators.required])
        })
    }

    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id')!);
        this.getTransactionDetails(this.id);
    }

    getTransactionDetails(id: number) {

        const apiUrl = this.apiUrlService.getTransactionByIdUrl(id);

        this.http.get(apiUrl).subscribe(
            (data: any) => {
                this.form.patchValue({
                    customerId: data.customerId,
                    accountNumber: data.accountNumber,
                    description: data.description,
                    trxAmount: data.trxAmount,
                    trxDate: data.trxDate,
                    trxTime: data.trxTime
                });
            },
            error => {
                console.error('Error fetching transaction details', error);
            }
        );
    }

    onSubmit() {
        if (this.form.valid) {

            const apiUrl = this.apiUrlService.getUpdateTransactionUrl(Number(this.id));

            this.http.put(apiUrl, this.form.value).subscribe(
                response => {
                    console.log('Transaction updated successfully', response);

                    // Redirect to the list page after successful update
                    this.router.navigate(['/dashboard/list']);
                },
                error => {
                    console.error('Error updating transaction', error);
                }
            )
        }
    }

}
