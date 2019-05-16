import { SERVICE_DELAY } from '../constants/constant';

export function debouceFunction(fun) {
    let debounceHolder;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceHolder);
        debounceHolder = setTimeout(() => fun.apply(context, args), SERVICE_DELAY);
    }
}