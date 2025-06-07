import { DOM } from './dom.js';
import { selectionSort } from './algorithmCode/selectionSort.js';
import { bubbleSort } from './algorithmCode/bubbleSort.js';
import { insertionSort } from './algorithmCode/insertionSort.js';
import { quickSort } from './algorithmCode/quickSort.js';
import { mergeSort } from './algorithmCode/mergeSort.js';
import { bucketSort } from './algorithmCode/bucketSort.js';
import { countingSort } from './algorithmCode/countingSort.js';
import { radixSort } from './algorithmCode/radixSort.js';
import { shellSort } from './algorithmCode/shellSort.js';
import { heapSort } from './algorithmCode/heapSort.js';

/**
 * 根据当前算法名称从 algorithmCode 文件夹对应的 js 文件取出代码
 * @param {string} currentAlgorithm 当前算法名称
 * @return {Promise<string>} 算法代码字符串
 */
export async function algorithmCodes(currentAlgorithm) {
    let code;
    switch (currentAlgorithm) {
        case 'selectionSort':
            code = selectionSort;
            break;
        case 'bubbleSort':
            code = bubbleSort;
            break;
        case 'insertionSort':
            code = insertionSort;
            break;
        case 'quickSort':
            code = quickSort;
            break;
        case 'mergeSort':
            code = mergeSort;
            break;
        case 'bucketSort':
            code = bucketSort;
            break;
        case 'countingSort':
            code = countingSort;
            break;
        case 'radixSort':
            code = radixSort;
            break;
        case 'shellSort':
            code = shellSort;
            break;
        case 'heapSort':
            code = heapSort;
            break;
        default:
            console.error('无效的排序算法');
            code = `// 未找到 ${currentAlgorithm} 的算法实现`;
    }
    return code;
}

/**
 * 高亮显示指定行号的代码
 * @param {Array<number>} linesToHighlight - 需要高亮的代码行号数组
 */
export async function highlightCode(currentAlgorithm, linesToHighlight) {
    // 获取当前算法的原始代码
    const rawCode = await algorithmCodes(currentAlgorithm);
    // 移除注释并分割成行
    const displayLines = rawCode.split('\n').map(line => {
        // 简单的正则匹配，移除行尾的单行注释
        let cleanedLine = line.replace(/\/\/.*$/, '').trimEnd();
        // 移除多行注释的开始和结束标记，以及行内注释
        cleanedLine = cleanedLine.replace(/\/\*[\s\S]*?\*\/|/g, '');
        return cleanedLine;
    }).filter(line => line.trim() !== ''); // 过滤掉空行

    let html = '';
    displayLines.forEach((line, index) => {
        // 原始代码行号与显示行号的映射
        // 这是一个简化的处理，实际中需要更精确的映射，因为注释行被移除了。
        // 为了简单，这里直接使用显示行号作为高亮依据，这可能与原始行号不完全对应。
        // 用户看到的是无注释的代码，高亮是基于这些无注释行的索引。
        const isHighlighted = linesToHighlight.includes(index + 1); // +1 因为行号从1开始
        html += `<div class="code-line ${isHighlighted ? 'highlight' : ''}">${line.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
    });
    DOM.codeDisplay.html(html);

    // 滚动到高亮行
    const highlightedElement = document.getElementById('code-display').querySelector('.highlight');
    if (highlightedElement) {
        highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}