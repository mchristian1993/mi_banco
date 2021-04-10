import { Moment } from 'moment';
import { ICuenta } from 'app/shared/model/cuenta.model';
import { ICuentasAsociadas } from 'app/shared/model/cuentas-asociadas.model';

export interface IHistorial {
  id?: number;
  montoHistorial?: number;
  descripcionHistorial?: string;
  idTransaccion?: number;
  fechaHistorial?: Moment;
  cuenta?: ICuenta;
  cuentasAsociadas?: ICuentasAsociadas;
}

export class Historial implements IHistorial {
  constructor(
    public id?: number,
    public montoHistorial?: number,
    public descripcionHistorial?: string,
    public idTransaccion?: number,
    public fechaHistorial?: Moment,
    public cuenta?: ICuenta,
    public cuentasAsociadas?: ICuentasAsociadas
  ) {}
}
