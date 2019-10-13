import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public patientForm: FormGroup;
  public healthInsurances;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {



    this.patientForm = this.fb.group({
      name: ['', [Validators.required]],
      health_insurance: ['', [Validators.required]],

      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      complement: [''],
      zip_code: ['', [Validators.required]],
      district: ['', [Validators.required]],
      city: ['', [Validators.required]],


    })


  }



  submitPatientData() {


    if (this.patientForm.valid) {


      let formControls = this.patientForm.controls;

      const patientData = {
        name: formControls.name.value,
        health_insurance_id: formControls.health_insurance.value,
        address: {
          street: formControls.street.value,
          number: formControls.number.value,
          complement: formControls.complement.value,
          zip_code: formControls.zip_code.value,
          district: formControls.district.value,
          city: formControls.city.value,
        },
        created_at: new Date(),
        updated_at: new Date(),
      }



    }


  }

}
