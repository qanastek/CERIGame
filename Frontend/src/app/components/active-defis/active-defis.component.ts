import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../Services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-defis',
  templateUrl: './active-defis.component.html',
  styleUrls: ['./active-defis.component.scss']
})
export class ActiveDefisComponent implements OnInit {

  id: string;

  defis: any[];

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    // Current identifier
    this.id = this.route.snapshot.paramMap.get('id');

    // Fetch the user challenges
    this.userService
    .activeDefis(this.id)
    .subscribe((res: any) => {
      this.defis = res;
    });
  }

}
