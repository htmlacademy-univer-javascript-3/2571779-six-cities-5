export class AppRoute {
  static Offer = class {
    public static Template = '/offer/:id';

    public static CreateOne(id: string): string {
      return this.Template.replace(':id', id);
    }
  };

  public static Main = '/';
  public static Favorites = '/favorites';
  public static Login = '/login';
  public static NotFound = '/notFound';
}
