import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { PokemonListComponent } from '../../features/pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonService } from '../../features/pokemons/services/pokemon.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ISimplePokemon } from '../../features/pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { PokemonListSkeletonComponent } from '../../features/pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component';

@Component({
  selector: 'app-pokemons',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css',
  providers: [PokemonService],
})
export default class PokemonsComponent implements OnInit {
  public isLoading = signal(true);
  public pokemons = signal<ISimplePokemon[]>([]);

  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((param) => param.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe( isStable =>  {
  //   console.log({ isStable });
  // })

  public ngOnInit(): void {
    this.loadPokemons();

    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }

  public loadPokemons(page = 0): void {
    const pageToLoad = this.currentPage()! + page;

    this.pokemonService.loadPage(pageToLoad).pipe(
      tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
      tap(() => this.title.setTitle(`Pokemons SSR - Page ${this.currentPage()}`))
    ).subscribe({
      next: (pokemons) => this.pokemons.set(pokemons),
    });
  }
}
