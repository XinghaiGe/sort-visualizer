import recordStep from "../utils/recordStep";
import { BAR_COLOR } from "../colorDefine";

export default function quickSortAlgorithm(arr, steps, low = 0, high = arr.length - 1, initialColors = []) {
    if (initialColors.length === 0) {
        recordStep(steps, arr, "开始快速排序", [1, 2], Array(arr.length).fill(BAR_COLOR.DEFAULT));
    }

    if (low < high) {
        recordStep(steps, arr, `对子数组 [${low}, ${high}] 进行分区`, [3],
            initialColors.length > 0 ? initialColors : Array(arr.length).fill(BAR_COLOR.DEFAULT));
        let pi = partition(arr, steps, low, high, initialColors);

        quickSortAlgorithm(arr, steps, low, pi - 1); // 递归左侧
        quickSortAlgorithm(arr, steps, pi + 1, high); // 递归右侧
    }
}

function partition(arr, steps, low, high, initialColors) {
    let pivot = arr[high];
    let i = low - 1;

    let colors = [...initialColors] || Array(arr.length).fill(BAR_COLOR.DEFAULT);
    colors[high] = BAR_COLOR.PIVOT;
    recordStep(steps, arr, `选择 ${pivot} (索引 ${high}) 作为基准`, [11], colors);

    for (let j = low; j < high; j++) {
        colors = [...initialColors] || Array(arr.length).fill(BAR_COLOR.DEFAULT);
        colors[high] = BAR_COLOR.PIVOT;
        colors[j] = BAR_COLOR.COMPARING;
        if (i >= low) colors[i] = BAR_COLOR.COMPARING;

        recordStep(steps, arr, `比较元素 ${arr[j]} (索引 ${j}) 和基准 ${pivot}`, [16], colors);

        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            recordStep(steps, arr, `交换 ${arr[i]} 和 ${arr[j]}`, [18, 20],
                colors.map((c, idx) => (idx === i || idx === j) ? BAR_COLOR.SWAPPING : c));
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    recordStep(steps, arr, `将基准 ${pivot} 交换到正确位置 (索引 ${i + 1})`, [24],
        colors.map((c, idx) => (idx === i + 1 || idx === high) ? BAR_COLOR.SWAPPING : c));

    return i + 1;
}