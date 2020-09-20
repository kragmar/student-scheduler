import { Router } from '@angular/router';
import { AuthService, TokenPayload } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private auth: AuthService, private router: Router) {}

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
}
