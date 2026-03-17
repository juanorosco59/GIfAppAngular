import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { environment } from '@environments/environment';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class GifsService {

    // HttpClient permite realizar peticiones HTTP (GET, POST, etc.) a APIs.
    // Angular lo proporciona mediante inyección de dependencias,
    // por lo que no es necesario crear una instancia manualmente.

    private http = inject(HttpClient);

    // Signal que almacena un arreglo de gifs.
    // Es reactivo, por lo que los cambios se reflejan automáticamente en la UI.


    LisGifs = signal<Gif[]>([]);

    trendingGifs = signal(true);

    searchHistory = signal<Record<string, Gif[]>>({});

    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));


    //El constructor permite inicializar la clase y ejecutar código al momento de crear 
    //una instancia de la clase.

    constructor() {
        this.loadTrendingGifs();
    }

    loadTrendingGifs() {

        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: '20'
            }
        })
            // Se suscribe a la respuesta HTTP para obtener los datos.
            // response contiene la respuesta de la API (tipo inferido por TypeScript).

            .subscribe(response => {

                const gifs = GifMapper.mapGiphyItemToGifToArray(response.data);

                this.LisGifs.set(gifs);

                this.trendingGifs.set(false);

                console.log(this.LisGifs());

            });


    }

    searchGifs(query: string) {


        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: '20',
                q: query
            }
        })

            .subscribe(response => {

                const gifs = GifMapper.mapGiphyItemToGifToArray(response.data);

                console.log({ search: gifs });

            });
    }

    searchGifsWithoutNoSubscribe(query: string) {


        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: '20',
                q: query
            }
        }).pipe(

            map(response => {
                const gifs = GifMapper.mapGiphyItemToGifToArray(response.data);

                return gifs;
            }),

            tap(gifs => { this.searchHistory.update(history => ({ ...history, [query]: gifs, })) })



            // Se deja de usar subscribe aquí para que sea el componente quien se 
            // suscriba a la respuesta HTTP, lo cual permite un mejor manejo de la 
            // respuesta y evita problemas de memoria al no manejar la suscripción dentro 
            // del servicio.

            //.subscribe(response => {
            // const gifs = GifMapper.mapGiphyItemToGifToArray(response.data);
            // console.log({search:gifs});

            //});
        )
    }

    getHistoryGift(query: string): Gif[] {

        return this.searchHistory()[query] ?? [];

    }

}