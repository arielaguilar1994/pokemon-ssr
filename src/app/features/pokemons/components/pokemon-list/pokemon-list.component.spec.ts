import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { ISimplePokemon } from '../../interfaces';
import { provideRouter } from '@angular/router';

const mockPokemons: ISimplePokemon[] = [
  { id: '1', name: 'someName' },
  { id: '2', name: 'someName2' },
];

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should to show pokemons list with 2 pokemon cards', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();

    const pokemonCardComponent = (fixture.nativeElement as HTMLDivElement).querySelectorAll('app-pokemon-card');

    expect(pokemonCardComponent.length).toBeGreaterThan(1);
  });

  it('should to show empty alert', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    const alertHtml = (fixture.nativeElement as HTMLDivElement).querySelector('div')?.textContent;

    expect(alertHtml).toContain("There isn't pokemons");
  });
});
