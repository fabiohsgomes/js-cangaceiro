class MensagemView extends View {
    template( model ) {
        return model.mensagem ? `<p class="alert alert-info">${model.mensagem}</p>` : `<p></p>`;
    };
}