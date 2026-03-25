import { ChangeDetectionStrategy, Component, Inject, InjectionToken } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {

  location = Inject(Location);

  goBack() {
    this.location.back();

  }



}
