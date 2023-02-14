export class Money{
    amount = 0;
    sign = '';
    constructor(amount : number, sign : string = '$'){
        this.amount = amount;
        this.sign = sign;
    }

    toString(){
        return this.sign + this.amount.toFixed(2);
    }
}