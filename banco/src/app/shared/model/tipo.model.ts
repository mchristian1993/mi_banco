export interface ITipo {
  id?: number;
  tipoCuenta?: string;
}

export class Tipo implements ITipo {
  constructor(public id?: number, public tipoCuenta?: string) {}
}
