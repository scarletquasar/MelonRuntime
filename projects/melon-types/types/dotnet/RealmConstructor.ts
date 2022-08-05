import { Realm } from "./Realm";

type RealmConstructor = new (name: string) => Realm;

export { RealmConstructor }