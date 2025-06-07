export const heapSort = `function heapSort(arr) {
    let n = arr.length;

    // 构建最大堆 (从最后一个非叶子节点开始)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // 一个个地从堆顶取出元素
    for (let i = n - 1; i > 0; i--) {
        // 将当前堆顶（最大元素）与末尾元素交换
        [arr[0], arr[i]] = [arr[i], arr[0]];
        // 对剩余的堆进行堆化
        heapify(arr, i, 0);
    }
    return arr;
}

// 堆化函数
function heapify(arr, n, i) {
    let largest = i; // 初始化最大元素为根
    let left = 2 * i + 1; // 左子节点
    let right = 2 * i + 2; // 右子节点

    // 如果左子节点比根大
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // 如果右子节点比目前最大元素大
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // 如果最大元素不是根
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]; // 交换
        // 递归堆化受影响的子树
        heapify(arr, n, largest);
    }
}`