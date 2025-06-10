import recordStep from "../utils/recordStep";
import { BAR_COLOR } from "../colorDefine";

/**
 * 堆排序算法实现，并记录每一步
 * @param {Array<number>} arr - 待排序数组
 * @param {Array<Object>} steps - 记录排序步骤的数组
 */
export default function heapSortAlgorithm(arr, steps) {
    let n = arr.length;
    recordStep(steps, arr, "开始堆排序", [1, 2], Array(n).fill(BAR_COLOR.DEFAULT));

    // 构建最大堆
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        recordStep(steps, arr, `构建堆: 对子树 ${i} 进行堆化`, [4],
            Array(n).fill(BAR_COLOR.DEFAULT)
                .map((c, idx) => idx === i ? BAR_COLOR.COMPARING : c));
        heapify(arr, n, i, steps);
    }
    recordStep(steps, arr, "最大堆构建完成", [5], Array(n).fill(BAR_COLOR.DEFAULT));

    // 一个个地从堆顶取出元素
    for (let i = n - 1; i > 0; i--) {
        recordStep(steps, arr, `将堆顶元素 ${arr[0]} 与末尾元素 ${arr[i]} 交换`, [8],
            Array(n).fill(BAR_COLOR.DEFAULT)
                .map((c, idx) => (idx === 0 || idx === i) ? BAR_COLOR.SWAPPING : c));
        [arr[0], arr[i]] = [arr[i], arr[0]];
        recordStep(steps, arr, `交换完成，元素 ${arr[i]} 已排序`, [8],
            Array(n).fill(BAR_COLOR.DEFAULT)
                .map((c, idx) => idx > i ? BAR_COLOR.SORTED : (idx === i ? BAR_COLOR.SORTED : c)));

        recordStep(steps, arr, `对剩余 ${i} 个元素的堆进行堆化`, [10],
            Array(n).fill(BAR_COLOR.DEFAULT)
                .map((c, idx) => idx > i ? BAR_COLOR.SORTED : c));
        heapify(arr, i, 0, steps);
    }
    recordStep(steps, arr, "堆排序完成", [11], Array(n).fill(BAR_COLOR.SORTED));
}

/**
 * 堆化函数，记录每一步
 * @param {Array<number>} arr - 数组
 * @param {number} n - 堆的大小
 * @param {number} i - 根节点索引
 * @param {Array<Object>} steps - 记录排序步骤的数组
 */
function heapify(arr, n, i, steps) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    let colors = Array(arr.length).fill(BAR_COLOR.DEFAULT);
    for (let k = n; k < arr.length; k++) colors[k] = BAR_COLOR.SORTED; // 标记已排序部分

    recordStep(steps, arr, `堆化: 根节点 ${arr[i]} (索引 ${i})`, [15],
        colors.map((c, idx) => idx === i ? BAR_COLOR.COMPARING : c));

    if (left < n) {
        recordStep(steps, arr, `堆化: 比较根节点 ${arr[largest]} 和左子节点 ${arr[left]}`, [19],
            colors.map((c, idx) => (idx === largest || idx === left) ? BAR_COLOR.COMPARING : c));
        if (arr[left] > arr[largest]) {
            largest = left;
            recordStep(steps, arr, `堆化: 左子节点 ${arr[left]} 更大`, [20],
                colors.map((c, idx) => idx === largest ? BAR_COLOR.COMPARING : c));
        }
    }

    if (right < n) {
        recordStep(steps, arr, `堆化: 比较当前最大 ${arr[largest]} 和右子节点 ${arr[right]}`, [24],
            colors.map((c, idx) => (idx === largest || idx === right) ? BAR_COLOR.COMPARING : c));
        if (arr[right] > arr[largest]) {
            largest = right;
            recordStep(steps, arr, `堆化: 右子节点 ${arr[right]} 更大`, [25],
                colors.map((c, idx) => idx === largest ? BAR_COLOR.COMPARING : c));
        }
    }

    if (largest !== i) {
        recordStep(steps, arr, `堆化: 交换 ${arr[i]} 和 ${arr[largest]}`, [29],
            colors.map((c, idx) => (idx === i || idx === largest) ? BAR_COLOR.SWAPPING : c));
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        recordStep(steps, arr, `堆化: 交换完成`, [29],
            colors.map((c, idx) => (idx === i || idx === largest) ? BAR_COLOR.SWAPPING : c));
        heapify(arr, n, largest, steps);
    }
}