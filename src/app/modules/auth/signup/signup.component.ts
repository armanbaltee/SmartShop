import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  formData!: FormGroup
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private authService: AuthService, private router: Router){ 
    this.formDatas();
  }

  formDatas(){
    this.formData = this.formBuilder.group({
        fname: ['', [Validators.required]],
        lname: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
  passwordChecker(){}
  onSubmit(){
    if(this.formData.invalid){
      this.snackBar.open('Error', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      })
      return
    }
    this.authService.signupApiCall(this.formData.value).subscribe({
      next: (res:any)=>{
        this.snackBar.open(`${res.message}`, 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      })
      },
      error: (err)=>{
        this.snackBar.open(`${err.message}`, 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      })
      }
    })
  }

  loginPage(){
    return this.router.navigate(['login'])
  }
}
