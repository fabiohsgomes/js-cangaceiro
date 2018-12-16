export function debounce(fn, milessegundos){
    let timer = 0;

    return () => {
        clearTimeout(timer);

        timer = setTimeout(() => fn(),milessegundos);
    }
}