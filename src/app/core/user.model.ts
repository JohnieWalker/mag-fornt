export default class User {
  constructor(private _ldap: string, private _password: string) {}

  get ldap() {
    return this._ldap;
  }

  get password() {
    return this._password;
  }
}
