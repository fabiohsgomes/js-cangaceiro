import {Negociacoes, NegociacaoService, Negociacao} from '../domain/index.js';
import {NegociacoesView, Mensagem, MensagemView} from '../ui/index.js';
import {DaoFactory, Bind, DateConverter, getExceptionMessage, debounce, controller, bindEvent} from '../util/index.js';

@controller('#data','#quantidade','#valor')
export class NegociacaoController {
    constructor(_inputData, _inputQuantidade, _inputValor){
        Object.assign(this,{_inputData,_inputQuantidade,_inputValor});
        
        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            'adiciona',
            'esvazia'
        );
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagemView'),
            'mensagem'
        );

        this._service = new NegociacaoService();

        this._init();
    }

    async _init(){
        try {
            const dao = await DaoFactory.getNegociacaoDao();
            const negociacoes =  await dao.listaTodos();

            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
        } catch (error) {
            this._mensagem.mensagem = getExceptionMessage(error);
        }
    }

    @bindEvent('submit','form')
    @debounce()
    async adiciona( e ) {
        try {
            e.preventDefault();
            const negociacao = this._criaNegociacao();

            const dao = await DaoFactory.getNegociacaoDao();
            await dao.adiciona(negociacao);

            this._negociacoes.adiciona(negociacao);
            this._mensagem.mensagem = 'Negociacao adicionada com sucesso';

            this._limpaFormulario();
        } catch (error) {
            this._mensagem.mensagem = error.message;
        }
    };

    @bindEvent('click','#botao-importa')
    @debounce(1500)
    async importaNegociacoes(){
        try {
            const negociacoes = await this._service.obterNegociacaoDaPeriodo();

            negociacoes
            .filter(novaNegociacao => !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente)))
            .forEach(negociacao => this._negociacoes.adiciona(negociacao));

            this._mensagem.mensagem = 'Negociações importadas com sucesso';
        } catch (error) {
            this._mensagem.mensagem = error.message
        }
    };

    @bindEvent('click','#botao-apaga')
    async apaga( e ) {
        try {
            const dao = await DaoFactory.getNegociacaoDao();
            await dao.apagaTodos();

            this._negociacoes.esvazia();
            this._mensagem.mensagem = 'Negociações apagadas com sucesso';            
        } catch (error) {
            this._mensagem.mensagem = error.message;
        };
    };

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    };

    _criaNegociacao() {
        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value, 10),
            parseFloat(this._inputValor.value)
        );
    }
}