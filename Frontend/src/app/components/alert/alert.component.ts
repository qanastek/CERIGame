import { AlertService } from './../../Services/alert.service';
import { AuthenticationServiceService } from './../../Services/authentication-service.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  public msg: string;
  public mode: string;
  public hidden: boolean;

  constructor(
    private alert: AlertService,
  ) { }

  ngOnInit(): void {

    // Subscribe to the message
    this.alert
    .getMsg()
    .subscribe(msg => {
      this.msg = msg;
    });

    // Subscribe to the mode
    this.alert
    .getMode()
    .subscribe(mode => {
      this.mode = mode;
    });

    // Subscribe to the hidden status
    this.alert
    .isHidden()
    .subscribe(hidden => {
      this.hidden = hidden;
    });
  }

  close() {
    this.alert.hideAlert();
  }

}
