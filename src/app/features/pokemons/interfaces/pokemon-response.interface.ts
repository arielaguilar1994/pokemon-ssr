export interface IPokemonResponse {
    count: number;
    next: string;
    previous?: string;
    results: IPokemonResult[];
}

export interface IPokemonResult {
    name: string;
    url: string;
}