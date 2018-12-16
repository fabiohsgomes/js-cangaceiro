System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            class View {
                constructor(seletor) {
                    this._elemento = document.querySelector(seletor);
                }

                template(model) {
                    throw new Error('O metodo deve ser implementado pelo filho');
                }
                update(model) {
                    this._elemento.innerHTML = this.template(model);
                }
            }

            _export('View', View);
        }
    };
});
//# sourceMappingURL=View.js.map