export class Mensagem{
    constructor(mensagem){
        this._texto = mensagem || '';
    }

    get mensagem(){
        return this._texto;
    };

    set mensagem(mensagem){
        this._texto = mensagem;
    };
}