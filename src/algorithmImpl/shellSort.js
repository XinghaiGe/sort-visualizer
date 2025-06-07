import recordStep from "../main";
import { BAR_COLOR_COMPARING, BAR_COLOR_DEFAULT,BAR_COLOR_PIVOT,BAR_COLOR_SORTED,BAR_COLOR_SWAPPING } from "../colorDefine";

/**
 * 希尔排序算法实现，并记录每一步
 * @param {Array<number>} arr - 待排序数组
 */
export default function shellSortAlgorithm(arr) {
    let n = arr.length;
    recordStep(arr, "开始希尔排序", [1, 2], Array(n).fill(BAR_COLOR_DEFAULT));

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        recordStep(arr, `当前增量: ${gap}`, [3], Array(n).fill(BAR_COLOR_DEFAULT));
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j;
            recordStep(arr, `将元素 ${temp} (索引 ${i}) 插入到增量为 ${gap} 的子序列中`, [5, 6], Array(n).fill(BAR_COLOR_DEFAULT).map((c, idx) => idx === i ? BAR_COLOR_COMPARING : c));
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                recordStep(arr, `比较 ${arr[j - gap]} 和 ${temp}`, [8], Array(n).fill(BAR_COLOR_DEFAULT).map((c, idx) => (idx === j - gap || idx === i) ? BAR_COLOR_COMPARING : c));
                arr[j] = arr[j - gap];
                recordStep(arr, `元素 ${arr[j]} (索引 ${j - gap}) 后移到索引 ${j}`, [9], Array(n).fill(BAR_COLOR_DEFAULT).map((c, idx) => idx === j ? BAR_COLOR_SWAPPING : c));
            }
            arr[j] = temp;
            recordStep(arr, `将 ${temp} 插入到索引 ${j}`, [11], Array(n).fill(BAR_COLOR_DEFAULT).map((c, idx) => idx === j ? BAR_COLOR_SWAPPING : c));
        }
    }
    recordStep(arr, "希尔排序完成", [12], Array(n).fill(BAR_COLOR_SORTED));
}