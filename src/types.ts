import { EntityTypes } from "./constants";

type BaseEntity = {
  name: string
  url: string
};

export type Character = BaseEntity & {
  homeworld: string
  starships: string[]
  birth_year: string
  eye_color: string
};

export type Planet = BaseEntity & {
  terrain: string
  climate: string
};

export type Starship = BaseEntity & {
  model: string
  manufacturer: string
  starship_class: string
};

export type StarWarsEntity = Character | Planet | Starship;

export type EntityType =
  EntityTypes.People | 
  EntityTypes.Planets |
  EntityTypes.Starships;

export type SearchResponse = {
  results: StarWarsEntity[]
};
