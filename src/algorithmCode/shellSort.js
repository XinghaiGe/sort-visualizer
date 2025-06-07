export const shellSort = `function shellSort(arr) {
    let n = arr.length;
    // 初始化增量序列，通常使用Knuth序列或其他
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // 对每个增量进行插入排序
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j;
            // 插入排序的内循环
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap]; // 元素后移
            }
            arr[j] = temp; // 插入元素
        }
    }
    return arr;
}`