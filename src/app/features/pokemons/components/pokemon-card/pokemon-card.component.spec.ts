import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { ISimplePokemon } from '../../interfaces';

const mockPokemon: ISimplePokemon = {
  id: '1',
  name: 'someName',
};

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
	let compiled: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
		fixture.componentRef.setInput('pokemon', mockPokemon);
		compiled = fixture.nativeElement as HTMLDivElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	it('should have the SimplePokemon signal inputValue', () => {
		expect(component.pokemon()).toEqual(mockPokemon);
	});

	it('should render the pokemon name and image correctly', () => {
		const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`
		const nameHtml = compiled.querySelector('h2')?.innerText;
		const imageHtml = compiled.querySelector('img') as HTMLImageElement;

		expect(nameHtml?.toLowerCase()).toBe(mockPokemon.name.toLowerCase());
		expect(imageHtml?.src).toEqual(imgSrc);
	});

	it('should have the proper ng-reflect-router-link', () => {
		const divHtmlLink = compiled.querySelector('div');
		expect(divHtmlLink).toBeDefined();

		const value = divHtmlLink?.attributes.getNamedItem('ng-reflect-router-link')?.value;
		expect(value).toContain(['/pokemons', mockPokemon.name])
	});
});
