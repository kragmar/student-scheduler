import { Router } from '@angular/router';
import { AuthService, TokenPayload } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: '',
  };

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.credentials = this.loginForm.value;
    this.login();
  }
}
