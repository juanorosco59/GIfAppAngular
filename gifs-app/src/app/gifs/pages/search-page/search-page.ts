import { Component, inject, signal } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
})
export default class SearchPage {


  gifsFromServiceSearch = inject(GifsService);

  resultsSearchShow = signal<Gif[]>([]);


  Onsearch(query: string) {

    //Recien aca se esta usando la función subcribe en lugar de usarlo desde el mismo servicio

    this.gifsFromServiceSearch.searchGifsWithoutNoSubscribe(query).subscribe((resp) => {

      this.resultsSearchShow.set(resp);

      console.log('Respuesta de búsqueda:', resp);

    });

    console.log('Buscando...', query);

    console.log('Historial de búsquedas:', this.gifsFromServiceSearch.searchHistoryKeys());



  }


}
