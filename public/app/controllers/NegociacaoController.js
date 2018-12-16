System.register(['../domain/index.js', '../ui/index.js', '../util/index.js'], function (_export, _context) {
    "use strict";

    var Negociacoes, NegociacaoService, Negociacao, NegociacoesView, Mensagem, MensagemView, DaoFactory, DataInvalidaException, Bind, DateConverter, getExceptionMessage;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    return {
        setters: [function (_domainIndexJs) {
            Negociacoes = _domainIndexJs.Negociacoes;
            NegociacaoService = _domainIndexJs.NegociacaoService;
            Negociacao = _domainIndexJs.Negociacao;
        }, function (_uiIndexJs) {
            NegociacoesView = _uiIndexJs.NegociacoesView;
            Mensagem = _uiIndexJs.Mensagem;
            MensagemView = _uiIndexJs.MensagemView;
        }, function (_utilIndexJs) {
            DaoFactory = _utilIndexJs.DaoFactory;
            DataInvalidaException = _utilIndexJs.DataInvalidaException;
            Bind = _utilIndexJs.Bind;
            DateConverter = _utilIndexJs.DateConverter;
            getExceptionMessage = _utilIndexJs.getExceptionMessage;
        }],
        execute: function () {
            class NegociacaoController {
                constructor() {
                    const $ = document.querySelector.bind(document);

                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');

                    this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView('#negociacoes'), 'adiciona', 'esvazia');
                    this._mensagem = new Bind(new Mensagem(), new MensagemView('#mensagemView'), 'mensagem');

                    this._service = new NegociacaoService();

                    this._init();
                }

                _init() {
                    var _this = this;

                    return _asyncToGenerator(function* () {
                        try {
                            const dao = yield DaoFactory.getNegociacaoDao();
                            const negociacoes = yield dao.listaTodos();

                            negociacoes.forEach(function (negociacao) {
                                return _this._negociacoes.adiciona(negociacao);
                            });
                        } catch (error) {
                            _this._mensagem.mensagem = getExceptionMessage(error);
                        }
                    })();
                }
                adiciona(e) {
                    var _this2 = this;

                    return _asyncToGenerator(function* () {
                        try {
                            e.preventDefault();
                            const negociacao = _this2._criaNegociacao();

                            const dao = yield DaoFactory.getNegociacaoDao();
                            yield dao.adiciona(negociacao);

                            _this2._negociacoes.adiciona(negociacao);
                            _this2._mensagem.mensagem = 'Negociacao adicionada com sucesso';

                            _this2._limpaFormulario();
                        } catch (error) {
                            _this2._mensagem.mensagem = error.message;
                        }
                    })();
                }

                inportarNegociacoes() {
                    var _this3 = this;

                    return _asyncToGenerator(function* () {
                        try {
                            const negociacoes = yield _this3._service.obterNegociacaoDaPeriodo();

                            negociacoes.filter(function (novaNegociacao) {
                                return !_this3._negociacoes.paraArray().some(function (negociacaoExistente) {
                                    return novaNegociacao.equals(negociacaoExistente);
                                });
                            }).forEach(function (negociacao) {
                                return _this3._negociacoes.adiciona(negociacao);
                            });

                            _this3._mensagem.mensagem = 'Negociações importadas com sucesso';
                        } catch (error) {
                            _this3._mensagem.mensagem = error.message;
                        }
                    })();
                }

                apaga(e) {
                    var _this4 = this;

                    return _asyncToGenerator(function* () {
                        try {
                            const dao = yield DaoFactory.getNegociacaoDao();
                            yield dao.apagaTodos();

                            _this4._negociacoes.esvazia();
                            _this4._mensagem.mensagem = 'Negociações apagadas com sucesso';
                        } catch (error) {
                            _this4._mensagem.mensagem = error.message;
                        };
                    })();
                }

                _limpaFormulario() {
                    this._inputData.value = '';
                    this._inputQuantidade.value = 1;
                    this._inputValor.value = 0.0;

                    this._inputData.focus();
                }

                _criaNegociacao() {
                    return new Negociacao(DateConverter.paraData(this._inputData.value), parseInt(this._inputQuantidade.value, 10), parseFloat(this._inputValor.value));
                }
            }

            _export('NegociacaoController', NegociacaoController);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map