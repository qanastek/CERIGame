import { UsersService } from './../../Services/users.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-defi',
  templateUrl: './defi.component.html',
  styleUrls: ['./defi.component.scss']
})
export class DefiComponent implements OnInit {

  users = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DefiComponent>,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {

    this.usersService
    .users()
    .subscribe((res: any) => {
      this.users = res;
    });
  }

}
