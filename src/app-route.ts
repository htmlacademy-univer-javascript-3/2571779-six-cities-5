export class AppRoute {
  static Offer = class {
    public static Template = '/offer/:id';

    public static CreateOne(id: number): string {
      return this.Template.replace(':id', id.toString());
    }
  };

  public static Main = '/';
  public static Favorites = '/favorites';
  public static Login = '/login';
}
