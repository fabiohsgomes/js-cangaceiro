class NegociacaoService {
    constructor(){
        this._http = new HttpService();
    };

    obterNegociacaoDaPeriodo(){
        return Promise.all([
            this.obterNegociacaoDaSemana(),
            this.obterNegociacaoDaSemanaAnterior(),
            this.obterNegociacaoDaSemanaRetrasada()
        ])
        .then(periodo => periodo
            .reduce((novoArray, item) => novoArray.concat(item),[])
            .sort((a,b) => b.data.getTime() - a.data.getTime()))
        .catch(err => {
            throw new Error('Não foi possível obter as negociações do período');
        });
    }
    obterNegociacaoDaSemana(){
        return this._http.get('negociacoes/semana')
        .then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
        err => {
            throw new Error('Não foi possível obter nas negociações da semana')
        });
    };

    obterNegociacaoDaSemanaAnterior(){
        return this._http.get('negociacoes/anterior')
        .then(dados => dados.map(objeto=>new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
        err => {
            throw new Error('Não foi possível obter nas negociações da semana anterior')
        });
    };

    obterNegociacaoDaSemanaRetrasada(){
        return this._http.get('negociacoes/retrasada')
        .then(dados => dados.map(objeto=>new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
        err => {
            throw new Error('Não foi possível obter nas negociações da semana anterior')
        });
    }
}