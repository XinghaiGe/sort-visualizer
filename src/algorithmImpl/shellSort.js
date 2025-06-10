import recordStep from "../utils/recordStep";
import { BAR_COLOR } from "../colorDefine";

export default function shellSortAlgorithm(arr, steps) {
    let n = arr.length;
    recordStep(steps, arr, "开始希尔排序", [1, 2], Array(n).fill(BAR_COLOR.DEFAULT));

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        recordStep(steps, arr, `当前增量: ${gap}`, [3], Array(n).fill(BAR_COLOR.DEFAULT));

        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j;
            recordStep(steps, arr, `将元素 ${temp} (索引 ${i}) 插入到增量为 ${gap} 的子序列中`, [5, 6],
                Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === i ? BAR_COLOR.COMPARING : c));

            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                recordStep(steps, arr, `比较 ${arr[j - gap]} 和 ${temp}`, [8],
                    Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => (idx === j - gap || idx === i) ? BAR_COLOR.COMPARING : c));
                arr[j] = arr[j - gap];
                recordStep(steps, arr, `元素 ${arr[j]} (索引 ${j - gap}) 后移到索引 ${j}`, [9],
                    Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === j ? BAR_COLOR.SWAPPING : c));
            }

            arr[j] = temp;
            recordStep(steps, arr, `将 ${temp} 插入到索引 ${j}`, [11],
                Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === j ? BAR_COLOR.SWAPPING : c));
        }
    }
    recordStep(steps, arr, "希尔排序完成", [12], Array(n).fill(BAR_COLOR.SORTED));
}