import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFormData!: FormGroup
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private authService: AuthService, private router: Router){ 
    this.formData()
  }

  formData(){
    this.loginFormData = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  onSubmit(){
    if(this.loginFormData.invalid){
      this.snackBar.open('Invalid Data', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        })
        return
    }
    this.authService.loginApiCall(this.loginFormData.value).subscribe({
      next: (res:any)=>{
        this.snackBar.open('Login Success', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        })
      },
      error: (err)=>{
        this.snackBar.open('Login Failed', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        })
      }
    })
  }

  signupPage(){
    return this.router.navigate(['signup'])
  }
}
