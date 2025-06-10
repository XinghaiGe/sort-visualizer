import recordStep from "../main";
import BAR_COLOR from "../colorDefine";

/**
 * 冒泡排序算法实现，并记录每一步
 * @param {Array<number>} arr - 待排序数组
 */
export default function bubbleSortAlgorithm(arr) {
    const n = arr.length;
    recordStep(arr, "开始冒泡排序", [1, 2], Array(n).fill(BAR_COLOR.DEFAULT));

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            recordStep(arr, `比较 ${arr[j]} 和 ${arr[j + 1]}`, [4], Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => (idx === j || idx === j + 1) ? BAR_COLOR.COMPARING : c));
            if (arr[j] > arr[j + 1]) {
                recordStep(arr, `交换 ${arr[j]} 和 ${arr[j + 1]}`, [6], Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => (idx === j || idx === j + 1) ? BAR_COLOR.SWAPPING : c));
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                recordStep(arr, `交换完成`, [6], Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => (idx === j || idx === j + 1) ? BAR_COLOR.SWAPPING : c));
            }
        }
        recordStep(arr, `第 ${i + 1} 轮冒泡完成，最大元素已移到末尾`, [8], Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx >= n - i - 1 ? BAR_COLOR.SORTED : c));
    }
    recordStep(arr, "冒泡排序完成", [9], Array(n).fill(BAR_COLOR.SORTED));
}