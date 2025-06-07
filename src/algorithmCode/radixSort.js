export const radixSort = `function radixSort(arr) {
    const getDigit = (num, pos) => Math.floor(Math.abs(num) / Math.pow(10, pos)) % 10;
    const maxDigit = Math.max(...arr).toString().length;

    for (let pos = 0; pos < maxDigit; pos++) {
        const buckets = Array.from({ length: 10 }, () => []);
        for (let num of arr) {
            const digit = getDigit(num, pos);
            buckets[digit].push(num);
        }
        arr = [].concat(...buckets);
    }
    return arr;
}`