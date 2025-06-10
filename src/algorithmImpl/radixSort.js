import recordStep from "../utils/recordStep";
import { BAR_COLOR } from "../colorDefine";

export default function radixSortAlgorithm(arr, steps) {
    const getDigit = (num, pos) => Math.floor(Math.abs(num) / Math.pow(10, pos)) % 10;
    const maxDigit = Math.max(...arr).toString().length;

    recordStep(steps, arr, "开始基数排序", [1, 2], Array(arr.length).fill(BAR_COLOR.DEFAULT));
    recordStep(steps, arr, `最大位数: ${maxDigit}`, [3], Array(arr.length).fill(BAR_COLOR.DEFAULT));

    for (let pos = 0; pos < maxDigit; pos++) {
        const buckets = Array.from({ length: 10 }, () => []);
        recordStep(steps, arr, `按第 ${pos} 位数字分配到桶`, [5], Array(arr.length).fill(BAR_COLOR.DEFAULT));

        for (let num of arr) {
            const digit = getDigit(num, pos);
            recordStep(steps, arr, `数字 ${num} 的第 ${pos} 位: ${digit}`, [7],
                Array(arr.length).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === arr.indexOf(num) ? BAR_COLOR.COMPARING : c));
            buckets[digit].push(num);
        }

        arr = [].concat(...buckets);
        recordStep(steps, arr, `收集桶中的元素`, [9], Array(arr.length).fill(BAR_COLOR.DEFAULT));
    }
    recordStep(steps, arr, "基数排序完成", [10], Array(arr.length).fill(BAR_COLOR.SORTED));
}