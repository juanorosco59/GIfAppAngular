import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private activateRoute = inject(ActivatedRoute);

  constructor() {}

  getCurrentPage(): number {
    return Number(this.activateRoute.snapshot.queryParamMap.get('page'));
  }

  static getGeneralNumber(): number {
    return 2;
  }
}
