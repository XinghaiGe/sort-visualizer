/**
 * 记录算法执行的每一步状态
 * @param {Array<number>} currentArray - 当前数组的副本
 * @param {string} description - 当前操作的描述
 * @param {Array<number>} highlightLines - 需要高亮的代码行号数组 (从1开始)
 * @param {Array<string>} barColors - 对应每个柱子的颜色数组
 */
export default function recordStep(steps, currentArray, description, highlightLines = [], barColors = []) {
    steps.push({
        array: [...currentArray], // 确保是数组的深拷贝
        description: description,
        highlightLines: highlightLines,
        barColors: barColors.length > 0 ? [...barColors] : Array(currentArray.length).fill(BAR_COLOR_DEFAULT)
    });
}