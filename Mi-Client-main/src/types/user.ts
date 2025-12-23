
export interface UserDetails {
  id: number;
  name: string;
  email: string;
  role: string;
}

export type Role = "admin" | "agent" | "customer";

export interface UserToCreate {
  name: string;
  email: string;
  password: string;
  role: Role;
}
