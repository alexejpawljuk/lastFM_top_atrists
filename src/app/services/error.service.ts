import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public error$ = new Subject<string>()

  public handle(message: string): void {
    this.error$.next(message)
  }

  public clear(): void {
    this.error$.next("")
  }
}
