export abstract class FirebaseStorable {
  public static deserialize(data: any): FirebaseStorable {
    return <FirebaseStorable> data;
  }
}
