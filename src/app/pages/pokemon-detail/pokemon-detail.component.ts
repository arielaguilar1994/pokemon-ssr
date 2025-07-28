import { Component, inject, OnInit, signal } from '@angular/core';
import { IPokemonDetailResponse } from '../../features/pokemons/interfaces';
import { PokemonService } from '../../features/pokemons/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-detail',
  imports: [],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css',
  providers: [PokemonService],
})
export default class PokemonDetailComponent implements OnInit {
  public pokemon = signal<IPokemonDetailResponse | null>(null);

  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pokemonService
      .getPokemonById(id)
      .pipe(
        tap(({ name, id }) => {
          const title = `#${id} - ${name}`;
          const description = `Pagina del Pokemon ${name}`;
          this.title.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });
          this.meta.updateTag({ name: 'og:title', content: title });
          this.meta.updateTag({ name: 'og:description', content: description });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
        })
      )
      .subscribe(this.pokemon.set);
  }
}
