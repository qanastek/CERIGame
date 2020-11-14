import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: any;

  constructor(private http: HttpClient) {
    this.socket = io(`ws://pedago.univ-avignon.fr:3223`);
  }

  listen(eventName: string): any {

    // Create subscriber
    return new Observable((sub) => {

      // Listen to the endpoint
      this.socket.on(eventName, (data) => {

        // Update itself with the new data
        sub.next(data);
      })
    });
  }

  emit(eventName: string, data: any): any {

    // Emit the data
    this.socket.emit(eventName, data);
  }
}
