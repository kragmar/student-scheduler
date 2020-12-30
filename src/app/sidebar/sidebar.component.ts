import { UserService } from '../core/services/user.service';
import { AuthService, UserDetails } from '../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userDetails: UserDetails;
  authToken: string;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authToken = localStorage.getItem('auth-token');
    this.userService.loggedInUser.subscribe(
      (data) => (this.userDetails = data)
    );
  }

  onLogout(): void {
    this.authService.logout();
  }
}
