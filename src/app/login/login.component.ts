import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordHide: boolean = true;
  constructor(private _apiService: ApiService, private _formBuilder: FormBuilder, private _router: Router) {
    this.loginForm = this.createLoginForm();
   }

  /**
   * Sends login request to the server.
   */
  login(): void {
    if (this.loginForm.valid) {
      this._apiService.userLogin(this.loginForm.value).subscribe(response => {
        // Route to items page.
        this._router.navigateByUrl('/items')
      }, (err => {
        // Alert error.
        alert(err.error.message)
      }))
    }
  }

  /**
   * Creates a login form.
   * @returns - Login form group object.
   */
  createLoginForm(): FormGroup {
    // Populate the form with pre-stored credentials.
    return this._formBuilder.group({
      user_email: ['frank@gmail.com', [Validators.required]],
      user_password: ['1234567', [Validators.required]]
    });
  }

}
