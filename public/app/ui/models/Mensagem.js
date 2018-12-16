System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            class Mensagem {
                constructor(mensagem) {
                    this._texto = mensagem || '';
                }

                get mensagem() {
                    return this._texto;
                }

                set mensagem(mensagem) {
                    this._texto = mensagem;
                }
            }

            _export('Mensagem', Mensagem);
        }
    };
});
//# sourceMappingURL=Mensagem.js.map