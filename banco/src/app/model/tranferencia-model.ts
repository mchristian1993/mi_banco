export class Transfer {
    constructor(
        public root_account: string,
        public destination_account: string,
        public amount: number
    ) { }
}
