import { AuthService } from '../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  authToken: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authToken = localStorage.getItem('auth-token');
  }

  onLogout(): void {
    this.authService.logout();
  }
}
