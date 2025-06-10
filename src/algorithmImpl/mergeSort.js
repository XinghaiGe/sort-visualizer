import recordStep from "../utils/recordStep";
import { BAR_COLOR } from "../colorDefine";

export default function mergeSortAlgorithm(arr, steps) {
    if (arr.length > 1) {
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        recordStep(steps, arr, `分割数组为左子数组 [${left}] 和右子数组 [${right}]`, [3],
            Array(arr.length).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx < mid ? BAR_COLOR.COMPARING : BAR_COLOR.DEFAULT));

        mergeSortAlgorithm(left, steps);
        mergeSortAlgorithm(right, steps);

        let i = 0, j = 0, k = 0;
        recordStep(steps, arr, "合并左子数组和右子数组", [5], Array(arr.length).fill(BAR_COLOR.DEFAULT));

        while (i < left.length && j < right.length) {
            recordStep(steps, arr, `比较 ${left[i]} 和 ${right[j]}`, [7],
                Array(arr.length).fill(BAR_COLOR.DEFAULT).map((c, idx) => (idx === k ? BAR_COLOR.COMPARING : c)));
            if (left[i] < right[j]) {
                arr[k] = left[i];
                i++;
                recordStep(steps, arr, `${left[i - 1]} 较小，放入数组`, [8],
                    Array(arr.length).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === k ? BAR_COLOR.SWAPPING : c));
            } else {
                arr[k] = right[j];
                j++;
                recordStep(steps, arr, `${right[j - 1]} 较小，放入数组`, [8],
                    Array(arr.length).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === k ? BAR_COLOR.SWAPPING : c));
            }
            k++;
        }

        while (i < left.length) {
            arr[k] = left[i];
            i++;
            k++;
            recordStep(steps, arr, `将剩余左子数组元素 ${left[i - 1]} 放入数组`, [10],
                Array(arr.length).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === k - 1 ? BAR_COLOR.SWAPPING : c));
        }

        while (j < right.length) {
            arr[k] = right[j];
            j++;
            k++;
            recordStep(steps, arr, `将剩余右子数组元素 ${right[j - 1]} 放入数组`, [10],
                Array(arr.length).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === k - 1 ? BAR_COLOR.SWAPPING : c));
        }
    }
    if (arr.length === 1) {
        recordStep(steps, arr, `单个元素 ${arr[0]} 视为已排序`, [11], Array(arr.length).fill(BAR_COLOR.SORTED));
    }
}