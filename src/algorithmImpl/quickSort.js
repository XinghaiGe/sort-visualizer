import recordStep from "../main";
import BAR_COLOR from "../colorDefine";
import { steps } from "../main";

/**
 * 快速排序算法实现，并记录每一步
 * @param {Array<number>} arr - 待排序数组
 * @param {number} low - 数组的起始索引
 * @param {number} high - 数组的结束索引
 * @param {Array<string>} initialColors - 初始颜色数组，用于递归调用时传递已排序部分的颜色
 */
export default function quickSortAlgorithm(arr, low, high, initialColors = []) {
    if (low === undefined) low = 0;
    if (high === undefined) high = arr.length - 1;

    if (initialColors.length === 0) {
        recordStep(arr, "开始快速排序", [1, 2], Array(arr.length).fill(BAR_COLOR.DEFAULT));
    }

    if (low < high) {
        recordStep(arr, `对子数组 [${low}, ${high}] 进行分区`, [3], initialColors.length > 0 ? initialColors : Array(arr.length).fill(BAR_COLOR.DEFAULT));
        let pi = partition(arr, low, high, initialColors);

        let currentColors = steps[steps.length - 1].barColors; // 获取partition后的颜色状态
        recordStep(arr, `基准元素 ${arr[pi]} 位于正确位置 (索引 ${pi})`, [4], currentColors.map((c, idx) => idx === pi ? BAR_COLOR.SORTED : c));

        quickSortAlgorithm(arr, low, pi - 1, currentColors); // 递归左侧
        quickSortAlgorithm(arr, pi + 1, high, currentColors); // 递归右侧
    } else if (low === high) {
        // 单个元素，视为已排序
        let currentColors = steps.length > 0 ? steps[steps.length - 1].barColors : Array(arr.length).fill(BAR_COLOR.DEFAULT);
        recordStep(arr, `元素 ${arr[low]} (索引 ${low}) 视为已排序`, [3], currentColors.map((c, idx) => idx === low ? BAR_COLOR.SORTED : c));
    }

    if (low === 0 && high === arr.length - 1 && arr.every((_, i) => steps[steps.length - 1].barColors[i] === BAR_COLOR.SORTED)) {
        recordStep(arr, "快速排序完成", [6], Array(arr.length).fill(BAR_COLOR.SORTED));
    }
}

/**
 * 快速排序分区函数，记录每一步
 * @param {Array<number>} arr - 数组
 * @param {number} low - 起始索引
 * @param {number} high - 结束索引
 * @param {Array<string>} initialColors - 初始颜色数组
 * @returns {number} 基准元素最终位置的索引
 */
function partition(arr, low, high, initialColors) {
    let pivot = arr[high];
    let i = (low - 1);

    let colors = initialColors.length > 0 ? [...initialColors] : Array(arr.length).fill(BAR_COLOR.DEFAULT);
    colors[high] = BAR_COLOR.PIVOT; // 标记基准
    recordStep(arr, `选择 ${pivot} (索引 ${high}) 作为基准`, [11], colors);

    for (let j = low; j < high; j++) {
        colors = initialColors.length > 0 ? [...initialColors] : Array(arr.length).fill(BAR_COLOR.DEFAULT);
        colors[high] = BAR_COLOR.PIVOT; // 标记基准
        colors[j] = BAR_COLOR.COMPARING; // 标记当前比较元素
        if (i >= low) colors[i] = BAR_COLOR.COMPARING; // 标记i的位置

        recordStep(arr, `比较元素 ${arr[j]} (索引 ${j}) 和基准 ${pivot}`, [16], colors);

        if (arr[j] <= pivot) {
            i++;
            colors[i] = BAR_COLOR.SWAPPING; // 标记i的位置
            colors[j] = BAR_COLOR.SWAPPING; // 标记j的位置
            recordStep(arr, `元素 ${arr[j]} 小于或等于基准，交换 ${arr[i]} 和 ${arr[j]}`, [18, 20], colors);
            [arr[i], arr[j]] = [arr[j], arr[i]];
            recordStep(arr, `交换完成`, [20], colors);
        }
    }

    colors = initialColors.length > 0 ? [...initialColors] : Array(arr.length).fill(BAR_COLOR.DEFAULT);
    colors[high] = BAR_COLOR.SWAPPING; // 标记基准
    colors[i + 1] = BAR_COLOR.SWAPPING; // 标记i+1的位置
    recordStep(arr, `将基准 ${pivot} 交换到正确位置 (索引 ${i + 1})`, [24], colors);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    recordStep(arr, `基准放置完成`, [24], colors);

    return i + 1;
}