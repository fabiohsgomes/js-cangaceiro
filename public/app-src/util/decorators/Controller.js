export function controller(...seletores){
    const elements = seletores.map(seletor => document.querySelector(seletor));

    return function(constructor){
        const construtorOriginal = constructor;
        const construtorNovo = function(){
            const instance = new construtorOriginal(...elements);
            Object.getOwnPropertyNames(construtorOriginal.prototype)
            .forEach(property => {
                if(Reflect.hasMetadata('bindEvent',instance,property)){
                    _associaEvento(instance, Reflect.getMetadata('bindEvent',instance,property));
                }
            });

            return new construtorOriginal(...elements);
        };

        construtorNovo.prototype = construtorOriginal.prototype;

        return construtorNovo;
    }
}

function _associaEvento(instance, metadado){
    document.querySelector(metadado.selector)
    .addEventListener(metadado.event, event => {
        if(metadado.prevent) event.preventDefault();
        instance[metadado.propertyKey](event);
    });
};