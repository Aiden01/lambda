import { uncurry } from './util';

export const zip = <A, B>(arr1: A[], arr2: B[]): [A, B][] => {
    const maxLen = Math.min(arr1.length, arr2.length);
    const a = arr1.slice(0, maxLen);
    const b = arr2.slice(0, maxLen);
    return a.map((x, i) => [x, b[i]]);
}

export const zipWith = <A, B, C>(f: (a: A, b: B) => C, arr1: A[], arr2: B[]) => {
    const zipped = zip(arr1, arr2);
    return zipped.map(x => uncurry(f, x));
}

export const take = <A>(n: number, it: Iterable<A>) => {
    const result = [];
    for (const x of it) {
	if (n) {
	    result.push(x);
	    n--;
	} else {
	    break;
	}
    }
    return result;
}

export const range = function *(start = 0, stop = 10) {
    for (let i = start; i < stop; i++) {
	yield i;
    }
}

export const infinite = function *() {
    let i = 0;
    while(true) {
	yield i;
	i++;
    }
}

export const map = <A, B>(f: (a: A) => B, arr: A[]): B[] => {
    return arr.reduce((acc, curr) => [...acc, f(curr)], [] as B[]);
}

export const compose = <A, B, C>(f: (b: B) => C, g: (a: A) => B) => {
    return (a: A) => f(g(a));
}

export const apply = <A, B>(f: (a: A) => B) => (x: A) => f(x);

export const enumerate = <A>(arr: A[]): [number, A][] => {
    const indices = take(arr.length - 1, infinite());
    return zip(indices, arr);
}

export const enumerateWith = <A, B>(arr: A[], f: (n: number, a: A) => B) => {
    return map((x) => uncurry(f, x), enumerate(arr));
}

console.log(enumerate([1, 2, 3, 4]));
