import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../api.service';

@Component({
	selector: 'app-item-create',
	templateUrl: './item-create.component.html',
	styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

	itemForm: FormGroup;
	submitted: boolean = false;
	loading: boolean = false;
	id: string = null;

	constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.itemForm = this.itemFormGroup();
		this.route.paramMap.subscribe(params => {
			this.id = params.get('id');
		});
		this.getData();
	}

	itemFormGroup(): FormGroup {
		return this.formBuilder.group({
				name: ['', Validators.required],
				price: ['', Validators.required],
				description: [''],
				file: [''],

		});
	}

	async getData() {
		if(this.id != null) {
			await this.apiService.get('/api/items', new HttpParams({fromString: 'id='+this.id})).subscribe((data:  object) => {
				this.itemForm.get('name').setValue(data[0].name);
				this.itemForm.get('price').setValue(data[0].price);
				this.itemForm.get('description').setValue(data[0].description);
	    })
		}
	}

	// convenience getter for easy access to form fields
	get f() { return this.itemForm.controls; }

	numberValidation(event: any) {
		if (event.which != 8 && event.which != 0 && event.which != 46 && (event.which < 48 || event.which > 57)) {
		return false;
		}
	}

	onFileChange(event): void {
		if(event.target.files.length > 0) {
			const reader = new FileReader();
			reader.onload = () => {
				this.itemForm.get('file').setValue(event.target.files[0]);
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	}

  onSubmit(): void {
		this.submitted = true;

		const formData: FormData = new FormData();

		if(this.id != null) {
			formData.append('_method', 'patch');
			formData.append('id', this.id);
		}

		formData.append('file', this.itemForm.get('file').value);
		formData.append('name', this.itemForm.get('name').value);
		formData.append('description', this.itemForm.get('description').value);
		formData.append('price', this.itemForm.get('price').value);

		// stop here if form is invalid
		if (this.itemForm.invalid) {
				return;
		}

		this.apiService.post('/api/items', formData).subscribe((data:  Array<object>) => {
	      this.router.navigate(['/'])
	    });
	} 


}
