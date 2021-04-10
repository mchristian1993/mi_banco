import { Moment } from 'moment';
import { User } from '../../services/user/user.model';
import { ITipo } from '../model/tipo.model';
import { IBanco } from '../model/banco.model';

export interface ICuenta {
  id?: number;
  numerCuenta?: number;
  aliasCuenta?: string;
  saldoCuenta?: number;
  monedaCuenta?: string;
  fechaCuenta?: Moment;
  descripcion?: string;
  user?: User;
  tipocuenta?: ITipo;
  tipoNombreBanco?: IBanco;
}

export class Cuenta implements ICuenta {
  constructor(
    public id?: number,
    public numerCuenta?: number,
    public aliasCuenta?: string,
    public saldoCuenta?: number,
    public monedaCuenta?: string,
    public fechaCuenta?: Moment,
    public descripcion?: string,
    public user?: User,
    public tipocuenta?: ITipo,
    public tipoNombreBanco?: IBanco
  ) {}
}
