import {obrigatorio} from '../../util/index.js';

export class Negociacao {
    constructor(
        _data = obrigatorio('Data')
        , _quantidade = obrigatorio('Quantidade')
        , _valor = obrigatorio('Valor')
    ){
        this._data = new Date(_data.getTime());
        
        Object.assign(this, {_quantidade, _valor});
        Object.freeze(this);
    }
    
    get data(){
        return new Date(this._data.getTime());
    };
    get quantidade(){
        return this._quantidade
    };
    get valor(){
        return this._valor;
    };
    get volume() {
        return this._quantidade * this._valor;
    };
    equals(negociacao){
        return JSON.stringify(this) == JSON.stringify(negociacao);
    }
}