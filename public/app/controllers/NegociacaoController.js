class NegociacaoController {
    constructor(){
        const $ = document.querySelector.bind(document);

        this._inputData       = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor      = $('#valor');

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

    _init(){
        DaoFactory.getNegociacaoDao()
        .then(dao => dao.listaTodos())
        .then(negociacoes => negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao)))
        .catch(err => this._mensagem.mensagem = err);
    }
    adiciona( e ) {
        e.preventDefault();

        try {
            const negociacao = this._criaNegociacao();

            DaoFactory.getNegociacaoDao()
            .then(dao => dao.adiciona(negociacao))
            .then(() => {
                this._negociacoes.adiciona(negociacao);
                this._mensagem.mensagem = 'Negociacao adicionada com sucesso';

                this._limpaFormulario();
            })
            .catch(err => this._mensagem.mensagem = err);
        } catch (error) {

            if(error instanceof DataInvalidaException) {
                this._mensagem.mensagem = error.message;
            } else this._mensagem.mensagem = 'Um erro não esperado aconteceu. Entre em contato com o suporte.'

        }

    };

    inportarNegociacoes(){

        this._service.obterNegociacaoDaPeriodo()
        .then(negociacoes => {
            negociacoes
            .filter(novaNegociacao => !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente)))
            .forEach(negociacao => this._negociacoes.adiciona(negociacao));

            this._mensagem.mensagem = 'Negociações importadas com sucesso';
        })
        .catch(err => this._mensagem.mensagem = err);
    };

    apaga( e ) {
        this._negociacoes.esvazia();
        this._mensagem.mensagem = 'Negociações apagadas com sucesso';
    };

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    };

    _criaNegociacao() {
        return new Negociacao(
            DataConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value, 10),
            parseFloat(this._inputValor.value)
        );
    }
}