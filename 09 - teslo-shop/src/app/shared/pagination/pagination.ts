import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagination {

  currentPage = input<number>(1);

  activatePage = linkedSignal<number>(this.currentPage);

  pages = input<number>(0);

  pageToExport = output<number>();

  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });

  procesar = effect(()=>{

    this.pageToExport.emit(this.activatePage());
  });

}
