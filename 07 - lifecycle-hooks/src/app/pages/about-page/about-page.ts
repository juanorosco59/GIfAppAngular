import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from "../../components/title/title";

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './about-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage { }
