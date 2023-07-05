export interface IUserKey {
    id: string;
  }
  
  export interface IUser extends IUserKey {
    name: string;
    preferences: Array<string>;
  }