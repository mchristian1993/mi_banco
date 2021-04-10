export interface IBanco {
  id?: number;
  tipoNombreBanco?: string;
}

export class Banco implements IBanco {
  constructor(public id?: number, public tipoNombreBanco?: string) {}
}
