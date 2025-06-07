export const countingSort = `function countingSort(arr) {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    const countArray = new Array(range).fill(0);

    for (let num of arr) {
        countArray[num - min]++;
    }

    let index = 0;
    for (let i = 0; i < range; i++) {
        while (countArray[i] > 0) {
            arr[index++] = i + min;
            countArray[i]--;
        }
    }
    return arr;
}`