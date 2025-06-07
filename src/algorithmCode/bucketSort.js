export const bucketSort = `function bucketSort(arr) {
    const n = arr.length;
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const bucketSize = 5; // 桶的大小（可根据实际情况调整）
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = new Array(bucketCount).fill(null).map(() => []);

    for (let i = 0; i < n; i++) {
        const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
        buckets[bucketIndex].push(arr[i]);
    }

    for (let i = 0; i < bucketCount; i++) {
        buckets[i].sort((a, b) => a - b);
    }

    let index = 0;
    for (let i = 0; i < bucketCount; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            arr[index++] = buckets[i][j];
        }
    }
    return arr;
}`