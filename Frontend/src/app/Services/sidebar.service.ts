import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private enabled: boolean;
  private enabledSub = new Subject<boolean>();

  constructor() { }

  /**
   * Toggle the side menu
   */
  toggle(): void {
    this.enabled = !this.enabled;
    this.enabledSub.next(this.enabled);
  }

  /**
   * Return the side bar status
   */
  getStatus(): any {
    return this.enabledSub.asObservable();
  }
}
