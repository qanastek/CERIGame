import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toast-challenge',
  templateUrl: './toast-challenge.component.html',
  styleUrls: ['./toast-challenge.component.scss']
})
export class ToastChallengeComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<ToastChallengeComponent>
  ) { }

  ngOnInit(): void {
  }

}
