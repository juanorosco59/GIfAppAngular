import { ChangeDetectionStrategy, Component, computed, inject, input, signal, Signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifList } from "../../components/gif-list/gif-list";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-gif-history',
  imports: [GifList],
  templateUrl: './gif-history.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistory {

  gifsFromService = inject(GifsService);
  
  queryDoraemonSignal = toSignal(inject(ActivatedRoute).params.pipe(
    map(params => params['queryGeneral']))
  );

  gifsByKey = computed(() => { return this.gifsFromService.getHistoryGift(this.queryDoraemonSignal()) });


}


