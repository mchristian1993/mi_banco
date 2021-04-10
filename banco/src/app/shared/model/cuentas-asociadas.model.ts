import { User } from '../../services/user/user.model';
import { ICuenta } from '../model/cuenta.model';

export interface ICuentasAsociadas {
  id?: number;
  aliasCuentaAsocia?: string;
  user?: User;
  cuenta?: ICuenta;
}

export class CuentasAsociadas implements ICuentasAsociadas {
  constructor(public id?: number, public aliasCuentaAsocia?: string, public user?: User, public cuenta?: ICuenta) {}
}
