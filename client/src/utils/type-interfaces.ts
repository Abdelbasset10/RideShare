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
