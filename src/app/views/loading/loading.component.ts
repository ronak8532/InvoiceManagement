import { Component, OnInit } from '@angular/core';
import {LoadingService} from '../../services/loading.service';
@Component({
  selector: 'app-loading',
  template: `<div *ngIf="loadingService.isLoading$ | async" class="fade show" style="text-align: center; padding-top: calc(100vh / 2); height: 100vh">
  <i class="spinner-grow spinner-grow-sm"></i>
  <span class="m-1">Loading...</span>
</div>`,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(public loadingService: LoadingService) { }

  ngOnInit(): void {
  }

}
