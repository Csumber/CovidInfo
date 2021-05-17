export class VaccineFormModel {
  constructor(
    public birthday: Date,
    public email: string,
    public gender: string,
    public name: string,
    public phone: string,
    public socialSecurityNumber: string,
    public symptoms: string,
    public terms: boolean,
    public vaccines: string[],
    public uid: string,
  ) {
  }
}

export class VaccineFormModelRaw {
  [s: string]: {
    birthday: string,
    email: string,
    gender: string,
    name: string,
    phone: string,
    socialSecurityNumber: string,
    symptoms: string,
    terms: boolean,
    vaccines: string[],
    uid: string,
  }

}
