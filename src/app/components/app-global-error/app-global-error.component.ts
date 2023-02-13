import {Component, OnDestroy, OnInit} from '@angular/core'
import { ErrorService } from "../../services/error.service"
import {Subject, takeUntil} from "rxjs"

@Component({
  selector: 'app-global-error',
  templateUrl: './app-global-error.component.html',
})
export class AppGlobalErrorComponent implements OnInit, OnDestroy {
  public error: string
  private readonly destroy$ = new Subject<void>()

  constructor(public errorService: ErrorService) {
  }

  public ngOnInit(): void {
    this.errorService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(err => this.error = err)
  }

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
