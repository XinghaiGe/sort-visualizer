import recordStep from "../utils/recordStep";
import { BAR_COLOR } from "../colorDefine";

export default function insertionSortAlgorithm(arr, steps) {
    const n = arr.length;
    recordStep(steps, arr, "开始插入排序", [1, 2], Array(n).fill(BAR_COLOR.DEFAULT));

    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        recordStep(steps, arr, `将元素 ${key} (索引 ${i}) 插入到已排序部分`, [3],
            Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === i ? BAR_COLOR.COMPARING : c));

        while (j >= 0 && arr[j] > key) {
            recordStep(steps, arr, `比较 ${arr[j]} 和 ${key}`, [5],
                Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => (idx === j || idx === i) ? BAR_COLOR.COMPARING : c));
            arr[j + 1] = arr[j];
            recordStep(steps, arr, `元素 ${arr[j]} (索引 ${j}) 后移到索引 ${j + 1}`, [6],
                Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === j + 1 ? BAR_COLOR.SWAPPING : c));
            j--;
        }
        arr[j + 1] = key;
        recordStep(steps, arr, `将 ${key} 插入到索引 ${j + 1}`, [8],
            Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === j + 1 ? BAR_COLOR.SWAPPING : c));
    }
    recordStep(steps, arr, "插入排序完成", [9], Array(n).fill(BAR_COLOR.SORTED));
}