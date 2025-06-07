import recordStep from "../main";
import { BAR_COLOR_COMPARING, BAR_COLOR_DEFAULT,BAR_COLOR_PIVOT,BAR_COLOR_SORTED,BAR_COLOR_SWAPPING } from "../colorDefine";

/**
 * 选择排序算法实现，并记录每一步
 * @param {Array<number>} arr - 待排序数组
 */
export default function selectionSortAlgorithm(arr) {
    const n = arr.length;
    recordStep(arr, "开始选择排序", [1, 2], Array(n).fill(BAR_COLOR_DEFAULT));

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        recordStep(arr, `寻找第 ${i + 1} 轮最小元素 (当前最小索引: ${minIndex})`, [3], Array(n).fill(BAR_COLOR_DEFAULT).map((c, idx) => idx === minIndex ? BAR_COLOR_COMPARING : c));
        for (let j = i + 1; j < n; j++) {
            recordStep(arr, `比较 ${arr[j]} 和 ${arr[minIndex]}`, [5], Array(n).fill(BAR_COLOR_DEFAULT).map((c, idx) => (idx === j || idx === minIndex) ? BAR_COLOR_COMPARING : c));
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                recordStep(arr, `更新最小索引为 ${minIndex}`, [6], Array(n).fill(BAR_COLOR_DEFAULT).map((c, idx) => idx === minIndex ? BAR_COLOR_COMPARING : c));
            }
        }
        recordStep(arr, `交换 ${arr[i]} 和 ${arr[minIndex]}`, [8], Array(n).fill(BAR_COLOR_DEFAULT).map((c, idx) => (idx === i || idx === minIndex) ? BAR_COLOR_SWAPPING : c));
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        recordStep(arr, `交换完成，元素 ${arr[i]} 已排序`, [8], Array(n).fill(BAR_COLOR_DEFAULT).map((c, idx) => idx <= i ? BAR_COLOR_SORTED : c));
    }
    recordStep(arr, "选择排序完成", [9], Array(n).fill(BAR_COLOR_SORTED));
}