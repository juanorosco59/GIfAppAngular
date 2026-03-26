import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe],
  templateUrl: './basic-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPage { 

nameLower = signal('Juan');
nameUpper = signal('JUAN');
fullName = signal('juAn OroSco')



}
