import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { IPokemonDetailResponse, IPokemonResponse, ISimplePokemon } from "../interfaces";

@Injectable()
export class PokemonService {
    private readonly rootUrl = 'https://pokeapi.co/api/v2/pokemon';
    private httpClient = inject(HttpClient);

    public loadPage(page: number): Observable<ISimplePokemon[]> {
        if(page !== 0) {
            --page;
        }

        page = Math.max(0, page);

        return this.httpClient.get<IPokemonResponse>(`${this.rootUrl}?offset=${ page * 20 }&limit=20`).pipe(
            map( resp => {
                const simplePokemon: ISimplePokemon[] = resp.results.map(item => ({
                    id: item.url.split('/').at(-2) ?? '',
                    name: item.name
                }));

                return simplePokemon;
            })
        );
    }

    public getPokemonById(id: string): Observable<IPokemonDetailResponse> {
        return this.httpClient.get<IPokemonDetailResponse>(`${this.rootUrl}/${id}`);
    }
}