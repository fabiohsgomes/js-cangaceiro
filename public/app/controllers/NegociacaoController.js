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
    }

    adiciona( e ) {
        e.preventDefault();

        try {
            this._negociacoes.adiciona(this._criaNegociacao());
            this._mensagem.mensagem = 'Negociacao adicionada com sucesso';
            this._limpaFormulario();            
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
            .filter(novaNegociacao => console.log('lógica do filtro'))
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