import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorService} from "../../services/error.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-global-error',
  templateUrl: './app-global-error.component.html',
})
export class AppGlobalErrorComponent implements OnInit, OnDestroy {
  error: string
  subscription: Subscription

  constructor(public errorService: ErrorService) {
  }

  ngOnInit() {
    this.subscription = this.errorService.error$.subscribe(err => this.error = err)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
