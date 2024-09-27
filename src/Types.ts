export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}

export enum VariablesAuth {
  NAME = "name",
  EMAIL = "email",
  PASSWORD = "password",
}
