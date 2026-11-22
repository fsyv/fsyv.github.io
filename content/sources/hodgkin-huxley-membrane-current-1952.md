---
title: "Hodgkin–Huxley 1952：电压钳动力学与兴奋预测"
date: 2026-11-23
draft: false
tags: [electrophysiology, dynamics, experiment]
id: "26970376-c4e5-40ea-8a4d-f9d92a905e2f"
kind: source
maturity: seed
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

- A. L. Hodgkin、A. F. Huxley，*A quantitative description of membrane current and its application to conduction and excitation in nerve*，*The Journal of Physiology* 117:500–544，1952。
- DOI：[10.1113/jphysiol.1952.sp004764](https://doi.org/10.1113/jphysiol.1952.sp004764)；实际读取[UCSD保存的原扫描](https://isn.ucsd.edu/courses/bggn260/reading/Hodgkin_Huxley_1952_jp.pdf)。原页写Received 10 March 1952为收稿日，不当发表日。2026-11-23为旧资料首次指定阅读。
- Astra实际指定文本读500–509、512–519、521–526、540–544相关段，523–524仅浏览数值步骤；视觉核505/507/512/518/520/525/541。web截图未返回像素，后用仓库外临时文件与Poppler读图；PMC访问遇captcha。不是45页通读或数值复现。

## Evidence

500–501页把膜电容与Na/K/leak电流并联；电压钳固定电压时，电导仍有不同的时间响应。501页总结前篇改变Na浓度、使电流反号而时程近似不变的证据，支持电压控制通透性；前篇未在本轮独立读取。

504–505页在电压平台令电容电流为零，但剩余总离子电流并未自动分成Na/K。本文使用前篇的分离结果，再以电流除以电压驱动力计算电导；驱动力为零处，单独电流值不足以如此识别电导。

506–509页以一阶状态 $n$ 的四次方描述K电导的延迟上升与较快下降；作者明确五或六次幂可能更贴近部分曲线，但更复杂。四次方不是从分子结构直接数出的四个部件。512–513页将较快激活 $m$ 与较慢失活 $h$ 组合为 $m^3h$ ，描述Na瞬态。

518–519页合并膜电位与三个状态的四个ODE，速率常数为瞬时电压函数，以6.3°C为参考，其他温度按 $3^{(T-6.3)/10}$ 缩放速率。该经验温度处理不当作普适规律。522页均匀膜、无轴向电流且短刺激结束后取总电流为零；空间传播须另有轴向电流项。

525页Fig12上层为6°C计算结果，初始去极化90/15/7mV触发峰，6mV为阈下响应；下层axon17的92/20/12/9.8标的是冲击电荷mμC/cm²，不是四个mV数，不是同四条件的严格配对。525–526页保留模型初始下落过小、峰过尖、下降肩和末端过尖等偏差。

541页说明后续现象没有另调从电压钳得到的方程与常数，但仍将分子解释视为暂拟。541–543页限定离体乌贼巨轴突短期响应，离子梯度的长期维持需额外过程；K电导延迟和理想电容可能解释部分偏差，K交换偏大仍未妥善解决。

## Support

支持[固定电压识别与自由膜预测](../notes/voltage-clamp-and-membrane-dynamics.md)的完整解释和[电生理阅读路径](../maps/electrophysiology-and-dynamic-models.md)。原文事实与AI固定电压算例分开；没有把经验状态赋予已确认分子结构。

## Limits

实际分离Na/K电流的前篇、现代单通道或结构证据均未独立读；不声称完整传播方程、全篇复现或现代生理综述。研究价值中、启发价值高；所读原文定位与简单算术可靠性高，真实数值复算和分子解释未验。
