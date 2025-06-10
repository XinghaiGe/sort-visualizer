import recordStep from "../utils/recordStep";
import { BAR_COLOR } from "../colorDefine";

/**
 * 计数排序算法实现，并记录每一步
 * @param {Array<number>} arr - 待排序数组
 * @param {Array<Object>} steps - 记录排序步骤的数组
 */
export default function countingSortAlgorithm(arr, steps) {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    const countArray = new Array(range).fill(0);

    recordStep(steps, arr, "开始计数排序", [1, 2], Array(arr.length).fill(BAR_COLOR.DEFAULT));
    recordStep(steps, arr, `创建计数数组，范围 [${min}, ${max}]`, [3], Array(arr.length).fill(BAR_COLOR.DEFAULT));

    for (let num of arr) {
        recordStep(steps, arr, `统计 ${num} 的出现次数`, [5],
            Array(arr.length).fill(BAR_COLOR.DEFAULT)
                .map((c, idx) => idx === arr.indexOf(num) ? BAR_COLOR.COMPARING : c));
        countArray[num - min]++;
    }

    let index = 0;
    for (let i = 0; i < range; i++) {
        while (countArray[i] > 0) {
            recordStep(steps, arr, `将 ${i + min} 放回原数组`, [7],
                Array(arr.length).fill(BAR_COLOR.DEFAULT)
                    .map((c, idx) => idx === index ? BAR_COLOR.SWAPPING : c));
            arr[index++] = i + min;
            countArray[i]--;
        }
    }
    recordStep(steps, arr, "计数排序完成", [8], Array(arr.length).fill(BAR_COLOR.SORTED));
}