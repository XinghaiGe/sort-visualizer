import { DOM } from './dom.js';
import CanvasJS from '@canvasjs/charts';
import {highlightCode} from './codeDisplay.js';

let chart = null; // canvasjs实例

/**
 * 更新可视化界面（代码高亮、步骤信息、图表）
 */
export default async function updateVisualization(currentAlgorithm, steps, currentStepIndex) {
    console.log(steps);
    if (steps.length === 0) {
        // 如果没有步骤，清空显示
        DOM.currentStepNumberSpan.textContent = 0;
        stepDescriptionSpan.textContent = "请选择算法并点击重置";
        codeDisplay.innerHTML = "";
        if (chart) chart.destroy();
        chart = null;
        return;
    }

    const currentStepData = steps[currentStepIndex];

    // 更新步骤信息
    DOM.currentStepNumberSpan.textContent = currentStepIndex + 1;
    DOM.stepDescriptionSpan.textContent = currentStepData.description;

    // 更新代码高亮
    await highlightCode(currentAlgorithm, currentStepData.highlightLines);

    // 更新图表
    renderChart(currentStepData.array, currentStepData.barColors);

    // 控制按钮的启用/禁用状态
    DOM.prevButton.disabled = currentStepIndex === 0;
    DOM.nextButton.disabled = currentStepIndex === steps.length - 1;
    // stopButton.disabled = animationInterval === null; // 只有在动画运行时才启用停止按钮
}

/**
 * 使用CanvasJS渲染柱状图
 * @param {Array<number>} dataArray - 数组数据
 * @param {Array<string>} barColors - 柱子的颜色数组
 */
export function renderChart(dataArray, barColors) {
    const chartData = dataArray.map((value, index) => ({
        y: value,
        label: value.toString(), // 在柱状图上显示数值
        color: barColors[index] || BAR_COLOR_DEFAULT
    }));

    if (chart) {
        // 如果图表已存在，更新数据
        chart.options.data[0].dataPoints = chartData;
        chart.render();
    } else {
        // 否则，创建新图表
        chart = new CanvasJS.Chart("chart-container", {
            animationEnabled: false, // 禁用CanvasJS内置动画，我们自己控制
            theme: "light2",
            title: {
                text: "数组状态"
            },
            axisY: {
                title: "数值",
                includeZero: true,
                maximum: 10, // 数组最大值是10
                interval: 1
            },
            axisX: {
                title: "索引"
            },
            data: [{
                type: "column", // 柱状图
                dataPoints: chartData,
                indexLabel: "{y}", // 显示柱子上的值
                indexLabelFontColor: "#333",
                indexLabelPlacement: "outside"
            }]
        });
        chart.render();
    }
}

/**
 * 停止动画（如果正在播放）
 */
export function stopAnimation(animationInterval) {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
        DOM.stopButton.disabled = true;
    }
}