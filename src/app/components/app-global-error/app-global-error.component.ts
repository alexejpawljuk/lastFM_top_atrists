import { Component, OnInit } from '@angular/core';
import { ErrorService } from "../../services/error.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-global-error',
  templateUrl: './app-global-error.component.html',
})
export class AppGlobalErrorComponent implements OnInit {
  error: string

  constructor(public errorService: ErrorService) {
  }

  ngOnInit() {
    this.errorService.error$.subscribe(err => this.error = err)
  }
}
