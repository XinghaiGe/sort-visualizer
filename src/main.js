import './style.css'
import viteLogo from '/vite.svg'
import $ from 'jquery';
import { DOM } from './dom.js'
import selectionSortAlgorithm from './algorithmImpl/selectionSort.js';
import bubbleSortAlgorithm from './algorithmImpl/bubbleSort.js';
import insertionSortAlgorithm from './algorithmImpl/insertionSort.js';
import quickSortAlgorithm from './algorithmImpl/quickSort.js';
import mergeSortAlgorithm from './algorithmImpl/mergeSort.js';
import bucketSortAlgorithm from './algorithmImpl/bucketSort.js';
import countingSortAlgorithm from './algorithmImpl/countingSort.js';
import radixSortAlgorithm from './algorithmImpl/radixSort.js';
import shellSortAlgorithm from './algorithmImpl/shellSort.js';
import heapSortAlgorithm from './algorithmImpl/heapSort.js';
import updateVisualization, { stopAnimation } from './visualization.js';

// 定义全局变量
let initialArray = [9, 2, 7, 5, 1, 8, 3, 10, 4, 6]; // 初始化数组
let currentAlgorithm = 'selectionSort'; // 当前选择的算法
export let steps = []; // 存储所有算法步骤的数组
let currentStepIndex = 0; // 当前步骤的索引
let chart = null; // CanvasJS 图表实例
let animationInterval = null; // 动画定时器

// 添加相关事件监听器
DOM.submitButton.on('click', () => {
    initialArray = $('#input-data').val().split(',').map(Number);
    console.log(initialArray);
    initialize();
})

DOM.algorithmSelect.on('change', (event) => {
    currentAlgorithm = event.target.value;
    initialize();
});

DOM.startButton.on('click', async () => {
    const intervalTime = document.getElementById('interval-time').value;
    // 停止之前的动画（如果存在）
    stopAnimation();

    // 如果已经在最后一步，则重置到第一步
    if (currentStepIndex >= steps.length - 1) {
        currentStepIndex = 0;
        await updateVisualization(currentAlgorithm, steps, currentStepIndex); // 更新显示
    }

    // 设置间隔1.5秒自动排序
    animationInterval = setInterval(async () => {
        if (currentStepIndex < steps.length - 1) {
            currentStepIndex++;
            await updateVisualization(currentAlgorithm, steps, currentStepIndex); // 更新显示
        } else {
            // 如果到达最后一步，停止动画
            stopAnimation();
        }
    }, intervalTime);
});

DOM.resetButton.on('click', () => {
    initialize();
});

DOM.prevButton.on('click', async () => {
    stopAnimation(); // 手动操作时停止动画
    if (currentStepIndex > 0) {
        currentStepIndex--;
        await updateVisualization(currentAlgorithm, steps, currentStepIndex); // 更新显示
    }
});

DOM.nextButton.on('click', async () => {
    stopAnimation(); // 手动操作时停止动画
    if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        await updateVisualization(currentAlgorithm, steps, currentStepIndex); // 更新显示
    }
});

DOM.stopButton.on('click', () => {
    stopAnimation();
});

/**
 * 记录算法执行的每一步状态
 * @param {Array<number>} currentArray - 当前数组的副本
 * @param {string} description - 当前操作的描述
 * @param {Array<number>} highlightLines - 需要高亮的代码行号数组 (从1开始)
 * @param {Array<string>} barColors - 对应每个柱子的颜色数组
 */
export default function recordStep(currentArray, description, highlightLines = [], barColors = []) {
    steps.push({
        array: [...currentArray], // 确保是数组的深拷贝
        description: description,
        highlightLines: highlightLines,
        barColors: barColors.length > 0 ? [...barColors] : Array(currentArray.length).fill(BAR_COLOR_DEFAULT)
    });
}

/**
 * 初始化或重置可视化系统
 */
export async function initialize() {
    stopAnimation(animationInterval); // 停止任何正在进行的动画
    steps = []; // 清空步骤
    currentStepIndex = 0; // 重置步骤索引

    const arrayCopy = [...initialArray]; // 使用原始数组的副本

    // 根据选择的算法预计算所有步骤
    switch (currentAlgorithm) {
        case 'selectionSort':
            selectionSortAlgorithm(arrayCopy);
            break;
        case 'bubbleSort':
            bubbleSortAlgorithm(arrayCopy);
            break;
        case 'insertionSort':
            insertionSortAlgorithm(arrayCopy);
            break;
        case 'quickSort':
            quickSortAlgorithm(arrayCopy);
            break;
        case 'mergeSort':
            mergeSortAlgorithm(arrayCopy);
            break;
        case 'bucketSort':
            bucketSortAlgorithm(arrayCopy);
            break;
        case 'countingSort':
            countingSortAlgorithm(arrayCopy);
            break;
        case 'radixSort':
            radixSortAlgorithm(arrayCopy);
            break;
        case 'shellSort':
            shellSortAlgorithm(arrayCopy);
            break;
        case 'heapSort':
            heapSortAlgorithm(arrayCopy);
            break;
        default:
            console.error('无效的排序算法');
    }

    DOM.totalStepsSpan.textContent = steps.length; // 更新总步骤数
    await updateVisualization(currentAlgorithm, steps, currentStepIndex); // 更新显示
}

// 页面加载完成后初始化
window.onload = () => {
    initialize();
    $('#input-data').val('5,4,3,1,1,2');
    $('#submit-button').click();
    $('#next-button').click();
};
