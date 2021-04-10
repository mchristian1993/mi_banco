import { Moment } from 'moment';
import { User } from '../../services/user/user.model';

export const enum Identificacion {
  CEDULA = 'CEDULA',
  TARJETA = 'TARJETA',
  IDENTIDAD = 'IDENTIDAD',
  CEDULA_EXTRANJERIA = 'CEDULA_EXTRANJERIA',
  PASAPORTE = 'PASAPORTE',
  OTRO = 'OTRO'
}

export const enum Sexo {
  FEMENINO = 'FEMENINO',
  MASCULINO = 'MASCULINO',
  OTRO = 'OTRO'
}

export const enum Nacionalidad {
  Colombia = 'Colombia'
}

export interface IPerfil {
  id?: number;
  tipoIdentificacion?: Identificacion;
  identificacion?: number;
  edad?: number;
  sexo?: Sexo;
  direccion?: string;
  fechaNacimiento?: Moment;
  nacionalidad?: Nacionalidad;
  telefono?: number;
  nombre_usuario?:string;
  user?: User;
}

export class Perfil implements IPerfil {
  constructor(
    public id?: number,
    public tipoIdentificacion?: Identificacion,
    public identificacion?: number,
    public edad?: number,
    public sexo?: Sexo,
    public direccion?: string,
    public fechaNacimiento?: Moment,
    public nacionalidad?: Nacionalidad,
    public telefono?: number,
    public nombre_usuario?:string,
    public user?: User
  ) {}
}
