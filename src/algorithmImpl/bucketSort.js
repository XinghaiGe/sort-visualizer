import recordStep from "../main";
import BAR_COLOR from "../colorDefine";

/**
 * 桶排序算法实现，并记录每一步
 * @param {Array<number>} arr - 待排序数组
 */
export default function bucketSortAlgorithm(arr) {
    const n = arr.length;
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const bucketSize = 5; // 桶大小（可调整）
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = new Array(bucketCount).fill(null).map(() => []);

    recordStep(arr, "开始桶排序", [1, 2], Array(n).fill(BAR_COLOR.DEFAULT));
    recordStep(arr, `创建 ${bucketCount} 个桶，桶大小为 ${bucketSize}`, [3], Array(n).fill(BAR_COLOR.DEFAULT));

    for (let i = 0; i < n; i++) {
        const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
        recordStep(arr, `将 ${arr[i]} 放入桶 ${bucketIndex}`, [5], Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === i ? BAR_COLOR.SWAPPING : c));
        buckets[bucketIndex].push(arr[i]);
    }

    for (let i = 0; i < bucketCount; i++) {
        recordStep(arr, `对桶 ${i} [${buckets[i]}] 进行排序`, [7], Array(n).fill(BAR_COLOR.DEFAULT));
        buckets[i].sort((a, b) => a - b);
    }

    let index = 0;
    for (let i = 0; i < bucketCount; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            recordStep(arr, `将桶 ${i} 中的 ${buckets[i][j]} 放回原数组`, [9], Array(n).fill(BAR_COLOR.DEFAULT).map((c, idx) => idx === index ? BAR_COLOR.SWAPPING : c));
            arr[index++] = buckets[i][j];
        }
    }
    recordStep(arr, "桶排序完成", [10], Array(n).fill(BAR_COLOR.SORTED));
}