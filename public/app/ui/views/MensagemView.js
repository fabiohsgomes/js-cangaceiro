System.register(['./View.js'], function (_export, _context) {
    "use strict";

    var View;
    return {
        setters: [function (_ViewJs) {
            View = _ViewJs.View;
        }],
        execute: function () {
            class MensagemView extends View {
                template(model) {
                    return model.mensagem ? `<p class="alert alert-info">${model.mensagem}</p>` : `<p></p>`;
                }
            }

            _export('MensagemView', MensagemView);
        }
    };
});
//# sourceMappingURL=MensagemView.js.map