
import { User } from '../../services/user/user.model';

export interface ITransferencia {
    id?: number;
    user?: User;
    root_account?: String,
    destination_account?: string,
    amount?: number
}

export class tranferencia implements ITransferencia {
    constructor(
        public id?: number,
        public user?: User,
        public root_account?: String,
        public destination_account?: string,
        public amount?: number

    ) { }
}
