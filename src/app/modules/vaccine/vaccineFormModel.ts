export class VaccineFormModel {
  constructor(
    public uid: string,
    public birthday: Date,
    public email: string,
    public gender: string,
    public name: string,
    public phone: string,
    public socialSecurityNumber: string,
    public symptoms: string,
    public terms: boolean,
    public vaccines: string[]
  ) {}
}
