import { SidebarService } from './../../Services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  status: boolean;

  constructor(
    private sidebar: SidebarService,
  ) { }

  ngOnInit(): void {

    // Subscribe to the mode
    this.sidebar
    .getStatus()
    .subscribe(status => {
      this.status = status;
    });
  }

  toggleMenu(): any {

    this.sidebar
    .toggle();

    console.log(this.status);
  }

}
