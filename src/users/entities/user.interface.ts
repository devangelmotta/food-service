export interface Preferences  {
  type: string,
  value: string
}

export interface IUserKey {
    id: string;
  }
  
  export interface IUser extends IUserKey {
    name: string;
    preferences: Array<Preferences>;
  }