import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {
  employeeForm:FormGroup
  changedImgPath: string;
  file: File;
  img: string = 'assets/images/themes/user3.png';

  constructor(private fb:FormBuilder) {

    this.employeeForm = this.initForm();
   }

  ngOnInit(): void {
    this.employeeForm.controls.profile_details.setValue(this.img);
  }

  initForm(): FormGroup {
		return this.fb.group({
			profile_details: [''],
    })
  }


  onFileSelect(event) {
		if (event.target.files.length > 0) {
			this.file = event.target.files.item(0);
			var reader = new FileReader();
			reader.readAsDataURL(this.file);
			reader.onload = (_event) => {
			    let imagePath = reader.result;
				this.employeeForm.controls.profile_details.setValue(imagePath);
			}
		}
	}
}
