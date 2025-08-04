import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { Location } from '@angular/common';

describe('App Routes', () => {
	let router: Router;
	let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
		
		router = TestBed.inject(Router);
		location = TestBed.inject(Location);

  });

	it('SHOULD navigate to "about" redirects to "/about"', async() => {
		await router.navigate(['about']);
		expect(location.path()).toEqual('/about')
	});

	it('SHOULD navigate to "unknown-page" redirects to "/about"', async() => {
		await router.navigate(['unknown-page']);
		expect(location.path()).toEqual('/about')
	});

	it('SHOULD to load the proper component', async () => {
			const aboutRoute = routes.find((route) => route.path === 'about')!;
			expect(aboutRoute).toBeDefined();

			const aboutComponent = await aboutRoute.loadComponent!() as any;

			expect(aboutComponent.default.name).toBe('AboutPagesComponent');
	});

	it('SHOULD to load the proper component pokemons', async () => {
			const pokemonRoute = routes.find((route) => route.path === 'pokemons/page/:page')!;
			expect(pokemonRoute).toBeDefined();

			const pokemonComponent = await pokemonRoute.loadComponent!() as any;

			expect(pokemonComponent.default.name).toBe('PokemonsComponent');
	});
});
