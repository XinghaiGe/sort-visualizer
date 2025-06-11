## 基于JavaScript的常用排序算法动态演示系统设计与实现

## 代码仓库

https://github.com/XinghaiGe/sort-visualizer

### 如何运行

```shell
npm install
```

```shell
npm run dev
```

### 代码结构

```
src
│  codeDisplay.js           # 代码展示和代码高亮
│  colorDefine.js			# 颜色图例定义
│  dom.js					# DOM 元素获取（采用表驱动法）
│  main.js					# 逻辑入口
│  style.css				# 样式文件
│  visualization.js			# 可视化更新和柱状图渲染
│
├─algorithmCode				# 待展示的十种排序算法代码
│      bubbleSort.js
│      bucketSort.js
│      countingSort.js
│      heapSort.js
│      insertionSort.js
│      mergeSort.js
│      quickSort.js
│      radixSort.js
│      selectionSort.js
│      shellSort.js
│
├─algorithmImpl				# 算法实现，记录每一步的详细信息
│      bubbleSort.js
│      bucketSort.js
│      countingSort.js
│      heapSort.js
│      insertionSort.js
│      mergeSort.js
│      quickSort.js
│      radixSort.js
│      selectionSort.js
│      shellSort.js
│
└─compare					# 对比展示不同排序
        compare.css
        compare.html
        compare.js
```

