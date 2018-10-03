class View{
    constructor(seletor){
        this._elemento = document.querySelector(seletor);
    };

    template( model ){
        throw new Error('O metodo deve ser implementado pelo filho');
    };
    update( model ) {
        this._elemento.innerHTML = this.template(model);
    };
}