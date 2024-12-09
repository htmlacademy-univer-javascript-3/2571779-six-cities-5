export class ApiRoute {
  static Favorite = class {
    public static List = '/favorite';

    public static SetStatus(offerId: string, status: boolean): string {
      return `${this.List}/${offerId}/${status ? 1 : 0}`;
    }
  };

  static Offers = class {
    public static List = '/offers';

    public static GetOne(offerId: string): string {
      return `${this.List}/${offerId}`;
    }

    public static GetNearbyFor(offerId: string): string {
      return `${this.List}/${offerId}/nearby`;
    }
  };

  static Comments = class {
    public static GetListFor(offerId: string) {
      return `/comments/${offerId}`;
    }
  };

  public static Login = '/login';
  public static Logout = '/logout';
}
