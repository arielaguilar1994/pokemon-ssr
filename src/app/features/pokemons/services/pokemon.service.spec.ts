import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { IPokemonResponse, ISimplePokemon } from '../interfaces';
import { catchError } from 'rxjs';

const mockResponseApi: IPokemonResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: '',
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemons: ISimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon = expectedPokemons[0];

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should load a page of SimplePokemons', () => {
    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
    );

    expect(req.request.method).toEqual('GET');
    req.flush(mockResponseApi);
  });

	it('Should load a page of SimplePokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?offset=80&limit=20'
    );

    expect(req.request.method).toEqual('GET');
    req.flush(mockResponseApi);
  });

	it('Should load a pokemon by id', () => {
		const pokemonId = '1';
    service.getPokemonById(pokemonId).subscribe((pokemons: any) => {
      expect(pokemons).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    expect(req.request.method).toEqual('GET');
    req.flush(mockPokemon);
  });

	it('Should catch error if pokemon not found', () => {
		const pokemonName = 'not-exist';
    service.getPokemonById(pokemonName)
		.pipe(
			catchError( err => {
				expect(err.message).toContain('Pokemon not found');

				return [];
			})
		)
		.subscribe();

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toEqual('GET');
    req.flush('Pokemon not found', {
			status: 404,
			statusText: 'Not Found'
		});
  });
});
