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

enum UserTypes {
  CHAUFFEUR = "CHAUFFEUR",
  ADMIN = "ADMIN",
  VOYAGEUR = "VOYAGEUR",
}
