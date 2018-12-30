import {HttpService} from '../../util/HttpService.js';
import {Negociacao} from './Negociacao.js';
import {ApplicationException} from '../../util/ApplicationException.js';

const httpserver = 'http://localhost:3000/';

export class NegociacaoService {
    constructor(){
        this._http = new HttpService();
    };

    async obterNegociacaoDaPeriodo(){
        try {
            let periodo = await Promise.all([
                this.obterNegociacaoDaSemana(),
                this.obterNegociacaoDaSemanaAnterior(),
                this.obterNegociacaoDaSemanaRetrasada()
            ]);

            return periodo.reduce((novoArray, item) => novoArray.concat(item),[])
            .sort((a,b) => b.data.getTime() - a.data.getTime());
        } catch (error) {
            new ApplicationException('Não foi possível obter as negociações do período');
        };
    };

    obterNegociacaoDaSemana(){
        return this._http.get(`${httpserver}negociacoes/semana`)
        .then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
        err => {
            new ApplicationException('Não foi possível obter nas negociações da semana');
        });
    };

    obterNegociacaoDaSemanaAnterior(){
        return this._http.get(`${httpserver}negociacoes/anterior`)
        .then(dados => dados.map(objeto=>new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
        err => {
            new ApplicationException('Não foi possível obter nas negociações da semana anterior');
        });
    };

    obterNegociacaoDaSemanaRetrasada(){
        return this._http.get(`${httpserver}negociacoes/retrasada`)
        .then(dados => dados.map(objeto=>new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
        err => {
            new ApplicationException('Não foi possível obter nas negociações da semana anterior');
        });
    };
}