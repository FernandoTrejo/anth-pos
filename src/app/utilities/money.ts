export class Money{
    amount = 0;
    sign = '';
    constructor(amount : number, sign : string = '$'){
        this.amount = amount;
        this.sign = sign;
    }

    toString(){
        if(this.amount < 0){
            return '(-) ' + this.sign + (Math.abs(this.amount)).toFixed(2);
        }
        return this.sign + this.amount.toFixed(2);
    }
}