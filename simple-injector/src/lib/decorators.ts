export function Injectable() {
    return function (target) {
        console.log('@Injectable decorator evaluated ', target);
        console.log('args ', arguments);
    };
}

export function Inject(token) {
    return function (target) {
        console.log('@Inject decorator evaluated ', target);
        console.log('args ', arguments);
    };
}