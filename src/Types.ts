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

export interface FormValues {
  endDate: Date;
  text: string;
  startDate: Date;
  title: string;
}

export interface EventNote {
  creation: {
    createdAt: number;
    updatedAt: number;
  };
  name: string;
  text: string;
  start: number | Date;
  end: number | Date;
  title: string;
  _id: string;
  _uid: string;
}
