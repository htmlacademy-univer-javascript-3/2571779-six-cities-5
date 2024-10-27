import {User} from './user.ts';

export class OfferComment {
  public id: string;
  public date: string;
  public user: User;
  public comment: string;
  public rating: number;
}
