import recordStep from "../main";
import { BAR_COLOR_COMPARING, BAR_COLOR_DEFAULT,BAR_COLOR_PIVOT,BAR_COLOR_SORTED,BAR_COLOR_SWAPPING } from "../colorDefine";

/**
 * 归并排序算法实现，并记录每一步
 * @param {Array<number>} arr - 待排序数组
 */
export default function mergeSortAlgorithm(arr) {
    if (arr.length > 1) {
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        recordStep(arr, `分割数组为左子数组 [${left}] 和右子数组 [${right}]`, [3], Array(arr.length).fill(BAR_COLOR_DEFAULT).map((c, idx) => idx < mid ? BAR_COLOR_COMPARING : BAR_COLOR_DEFAULT));
        mergeSortAlgorithm(left);
        mergeSortAlgorithm(right);

        let i = 0, j = 0, k = 0;
        recordStep(arr, "合并左子数组和右子数组", [5], Array(arr.length).fill(BAR_COLOR_DEFAULT));
        while (i < left.length && j < right.length) {
            recordStep(arr, `比较 ${left[i]} 和 ${right[j]}`, [7], Array(arr.length).fill(BAR_COLOR_DEFAULT).map((c, idx) => (idx === k ? BAR_COLOR_COMPARING : c)));
            if (left[i] < right[j]) {
                arr[k] = left[i];
                i++;
                recordStep(arr, `${left[i - 1]} 较小，放入数组`, [8], Array(arr.length).fill(BAR_COLOR_DEFAULT).map((c, idx) => idx === k ? BAR_COLOR_SWAPPING : c));
            } else {
                arr[k] = right[j];
                j++;
                recordStep(arr, `${right[j - 1]} 较小，放入数组`, [8], Array(arr.length).fill(BAR_COLOR_DEFAULT).map((c, idx) => idx === k ? BAR_COLOR_SWAPPING : c));
            }
            k++;
        }

        while (i < left.length) {
            arr[k] = left[i];
            i++;
            k++;
            recordStep(arr, `将剩余左子数组元素 ${left[i - 1]} 放入数组`, [10], Array(arr.length).fill(BAR_COLOR_DEFAULT).map((c, idx) => idx === k - 1 ? BAR_COLOR_SWAPPING : c));
        }

        while (j < right.length) {
            arr[k] = right[j];
            j++;
            k++;
            recordStep(arr, `将剩余右子数组元素 ${right[j - 1]} 放入数组`, [10], Array(arr.length).fill(BAR_COLOR_DEFAULT).map((c, idx) => idx === k - 1 ? BAR_COLOR_SWAPPING : c));
        }
    }
    if (arr.length === 1) {
        recordStep(arr, `单个元素 ${arr[0]} 视为已排序`, [11], Array(arr.length).fill(BAR_COLOR_SORTED));
    } else if (arr.length > 1) {
        recordStep(arr, `数组 [${arr}] 合并完成`, [12], Array(arr.length).fill(BAR_COLOR_DEFAULT));
    }
    if (arr.length === initialArray.length && isSorted(arr)) {
        recordStep(arr, "归并排序完成", [13], Array(arr.length).fill(BAR_COLOR_SORTED));
    }
}

// 辅助函数：检查数组是否已排序
function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) return false;
    }
    return true;
}