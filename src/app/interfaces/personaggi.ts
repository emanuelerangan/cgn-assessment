export interface PersonaggiResponse {
  count: number;
  next: string;
  previous?: any;
  results: Personaggio[];
}
export interface Personaggio {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: any[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}

export interface PersonaggiParams {
  page: number;
}
