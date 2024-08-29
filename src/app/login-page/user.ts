export interface User {
  id: number,
  username: string,
  role: Role,
  token: string
}

export enum Role {
  Admin,
  Client,
  Courier,
  Officeworker,
}

