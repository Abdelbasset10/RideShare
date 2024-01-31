import { z, string } from "zod";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  n_tlph: string;
  type: UserTypes;
  matricule: string;
  picture: string;
  gender: Gender;
  car: Car;
  apiKey: string;
}

export interface Position {
  id: string;
  latitude: string;
  longitude: string;
  name: string;
  start_trajets: Trajet[];
  end_trajets: Trajet[];
}

export interface Trajet {
  id: string;
  start_date: string;
  hour_start: string;
  nb_place: number;
  price: number;
  reservations: Reservation[];
  chauffeur: User | null;
  position_start: Position;
  position_end: Position;
  car: Car;
}

export interface Reservation {
  id: string;
  nb_place: number;
  user: User;
  trajet: Trajet;
}

export interface Car {
  id: string;
  year: string;
  matricule: string;
  marque: string;
  model: string;
  trajets: Trajet[];
  max_places: number;
  owner: User | null;
}

export interface GridActionsButtons {
  onClick: (trajet: Trajet) => void;
  label: string;
  class: string;
}

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum UserTypes {
  CHAUFFEUR = "CHAUFFEUR",
  ADMIN = "ADMIN",
  VOYAGEUR = "VOYAGEUR",
}
