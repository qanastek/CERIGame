import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  // Alert mode
  private mode = undefined;
  private modeSub = new Subject<string>();

  // Alert message
  private msg = undefined;
  private msgSub = new Subject<string>();

  // Hidden status
  private hidden = true;
  private hiddenSub = new Subject<boolean>();

  /**
   * Display the alert modal
   * @param msg The message
   * @param mode The mode (success, danger, ...)
   */
  displayAlert(msg: string, mode: string): void {

    // Update the observables
    this.mode = mode;
    this.modeSub.next(this.mode);

    this.msg = msg;
    this.msgSub.next(this.msg);

    this.hidden = false;
    this.hiddenSub.next(this.hidden);
  }

  /**
   * Hidden the alert modal
   */
  hideAlert(): void {

    // Update the observables
    this.mode = undefined;
    this.modeSub.next(this.mode);

    this.msg = undefined;
    this.msgSub.next(this.msg);

    this.hidden = true;
    this.hiddenSub.next(this.hidden);
  }

  // Getter for the mode
  getMode(): any {
    return this.modeSub.asObservable();
  }

  // Getter for the message
  getMsg(): any {
    return this.msgSub.asObservable();
  }

  // Getter for the status
  isHidden(): any {
    return this.hiddenSub.asObservable();
  }
}
