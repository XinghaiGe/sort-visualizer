export const quickSort = `function quickSort(arr, low, high) {
    if (low < high) {
        // 找到基准的正确位置
        let pi = partition(arr, low, high);

        // 递归对左右两部分进行排序
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

// 分区函数
function partition(arr, low, high) {
    let pivot = arr[high]; // 选择最后一个元素作为基准
    let i = (low - 1); // 小于基准的元素的索引

    for (let j = low; j < high; j++) {
        // 如果当前元素小于或等于基准
        if (arr[j] <= pivot) {
            i++;
            // 交换 arr[i] 和 arr[j]
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    // 将基准元素放到正确的位置
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1; // 返回基准的索引
}`