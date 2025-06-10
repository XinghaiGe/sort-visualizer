import recordStep from "../utils/recordStep";
import { BAR_COLOR } from "../colorDefine";

export default function selectionSortAlgorithm(arr, steps) {
    const n = arr.length;
    recordStep(steps, arr, "开始选择排序", [1, 2], Array(n).fill(BAR_COLOR.DEFAULT));

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        recordStep(steps, arr, `寻找第 ${i + 1} 轮最小元素 (当前最小索引: ${minIndex})`, [3],
            Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === minIndex ? BAR_COLOR.COMPARING : c));

        for (let j = i + 1; j < n; j++) {
            recordStep(steps, arr, `比较 ${arr[j]} 和 ${arr[minIndex]}`, [5],
                Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => (idx === j || idx === minIndex) ? BAR_COLOR.COMPARING : c));
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                recordStep(steps, arr, `更新最小索引为 ${minIndex}`, [6],
                    Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === minIndex ? BAR_COLOR.COMPARING : c));
            }
        }

        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        recordStep(steps, arr, `交换 ${arr[i]} 和 ${arr[minIndex]}`, [8],
            Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => (idx === i || idx === minIndex) ? BAR_COLOR.SWAPPING : c));
        recordStep(steps, arr, `交换完成，元素 ${arr[i]} 已排序`, [8],
            Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx <= i ? BAR_COLOR.SORTED : c));
    }
    recordStep(steps, arr, "选择排序完成", [9], Array(n).fill(BAR_COLOR.SORTED));
}