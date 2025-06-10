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
            selectionSortAlgorithm(arrayCopy, steps);
            break;
        case 'bubbleSort':
            bubbleSortAlgorithm(arrayCopy, steps);
            break;
        case 'insertionSort':
            insertionSortAlgorithm(arrayCopy, steps);
            break;
        case 'quickSort':
            quickSortAlgorithm(arrayCopy, steps);
            break;
        case 'mergeSort':
            mergeSortAlgorithm(arrayCopy, steps);
            break;
        case 'bucketSort':
            bucketSortAlgorithm(arrayCopy, steps);
            break;
        case 'countingSort':
            countingSortAlgorithm(arrayCopy, steps);
            break;
        case 'radixSort':
            radixSortAlgorithm(arrayCopy, steps);
            break;
        case 'shellSort':
            shellSortAlgorithm(arrayCopy, steps);
            break;
        case 'heapSort':
            heapSortAlgorithm(arrayCopy, steps);
            break;
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
