import { AuthService } from '../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  loggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .loggedInObservable()
      .subscribe((data) => (this.loggedIn = data));
  }

  onLogout(): void {
    this.authService.logout();
  }
}
