---
title: "CSS动画词汇表"
description: "AI提示词中使用到的CSS动画专业术语"
keywords: ["css", "css animation", "ai", "prompt"]
tags: ["css", "ai", "prompt"]
---

## 进入与退出 (Entrances & Exits)

- Fade in / Fade out — 元素通过改变不透明度出现或消失。
- Slide in — 元素从屏幕外滑入（左、右、上或下）进入视图。
- Scale in — 元素从较小放大到正常大小出现，常与淡入同时使用。
- Pop in — 元素带有轻微超出再回弹的效果出现，像是弹入位置。
- Reveal — 内容通过逐步揭示（例如动画化的 clip-path 或遮罩）被展示出来。
- Enter / Exit — 元素被添加到或移出屏幕时播放的动画。

## 排序与时序 (Sequencing & Timing)

- Keyframes — 在动画中定义的关键点（如 0%、50%、100%），浏览器会填充中间帧。
- Interpolation / Tween — 在起始值和结束值之间生成连续的中间帧，使运动平滑。
- Stagger — 使多个项按顺序以小延迟依次动画，形成瀑布式效果。
- Orchestration — 有意地为多个动画安排时序，使它们感觉像一个协调的整体运动。
- Delay — 动画开始前的等待时间。
- Duration — 动画持续的时间长度。
- Fill mode — 控制元素在动画开始前或结束后是否保持第一帧或最后一帧的样式（例如 forwards）。
- Stepped animation — 将动画分成离散步骤（例如倒计时），而非连续过渡。

## 运动与变换 (Movement & Transforms)

- Translate — 沿 X 或 Y 轴移动元素的位置。
- Scale — 改变元素的尺寸，使其变大或变小。
- Rotate — 围绕某点旋转元素。
- Skew — 沿 X 或 Y 轴倾斜元素，使其形状产生剪切效果。
- 3D tilt / Flip — 在 3D 空间中旋转（如 rotateX / rotateY），增加深度感。
- Perspective — 决定 3D 效果的强弱；较小的值会夸张深度感，好像观察者更接近。
- Transform origin — 缩放或旋转的锚点，即从哪个点生长或旋转。
- Origin-aware animation — 元素从触发它的源点展开（例如从按钮处展开），而非自身中心。

## 状态间过渡 (Transitions Between States)

- Crossfade — 一个元素淡出同时另一个在相同位置淡入。
- Continuity transition — 通过视觉连接前后状态使用户保持方向感，例如保持同一矩形的缩放变化。
- Morph — 一种形状平滑变成另一种形状的过程（例如 Dynamic Island 的效果）。
- Shared element transition — 元素在位置间移动并变形，比如缩略图扩展成卡片。
- Layout animation — 当元素尺寸或位置改变时，元素平滑移动到新位置而不是直接跳到目标。
- Accordion / Collapse — 区块平滑展开或收缩高度以显示或隐藏内容。
- Direction-aware transition — 前进时内容向一侧滑入，后退时相反，保留导航方向感。

## 滚动相关 (Scroll)

- Scroll reveal — 元素进入视口时淡入或滑入到位。
- Scroll-driven animation — 动画进度直接与滚动位置绑定。
- Parallax — 背景与前景在滚动时以不同速度移动，制造深度感。
- Page transition — 在从一个页面或路由导航到另一个时播放的动画。
- View transition — 浏览器在两个状态或页面之间进行形态变换，连接共享元素。

## 反馈与交互 (Feedback & Interaction)

- Hover effect — 当光标移动到元素上时发生的视觉变化。
- Press / Tap feedback — 点击时的细微缩放或反馈，使交互更具触感。
- Hold to confirm — 用户长按时出现的进度效果，表示确认操作。
- Drag — 通过抓取移动元素，释放后通常具有惯性效果。
- Drag to reorder — 在列表中拖动项以重新排序，同时其他项移动让出空间。
- Swipe to dismiss — 将元素拖出屏幕以关闭它，比如抽屉或通知。
- Rubber-banding — 当拖动超出边界时出现阻力并回弹（类似 iOS 的过度滚动感觉）。
- Shake / Wiggle — 快速左右抖动，通常用来提示错误或被拒绝的输入。
- Ripple — 点击点处向外扩散的圆形波纹，确认按下动作。

## 缓动 (Easing)

- Easing — 动画加速或减速的速率曲线。
- Ease-out — 开始快、结束慢。大多数 UI 和响应式动画的默认选择。
- Ease-in — 开始慢、结束快。通常会让人感觉迟缓，应谨慎使用。
- Ease-in-out — 先慢后快再慢，适合屏内元素从 A 点移动到 B 点。
- Linear — 恒定速度。通常只用于加载器或跑马灯。
- Cubic-bezier — 可以自定义的缓动曲线，用于精细控制运动节奏。
- Asymmetric easing — 加速和减速速率不对称的曲线，通常比对称曲线更具生命感。

## 弹簧动画 (Spring Animations)

- Spring — 基于物理参数（张力、质量、阻尼）驱动的运动，而非固定时长。
- Stiffness / Tension — 弹簧拉向目标的力度，值越高感觉越紧凑、响应越快。
- Damping — 弹簧如何快速衰减震荡，阻尼越低则弹性和震荡越明显。
- Mass — 动画对象的“重量”，质量越大移动越缓慢显得沉重。
- Bounce — 弹簧会超出目标并回弹，增加俏皮感。
- Perceptual duration — 弹簧给人的完成感时长，即使底层仍有微小震荡。
- Momentum — 运动携带的速度，在拖动或中断后继续影响后续动画。
- Velocity — 元素移动的速度和方向；被打断时弹簧会把速度带入下一段动画。
- Interruptible animation — 可以在飞行动作中平滑重定向而不是先完成再改变。

## 循环与环境运动 (Looping & Ambient Motion)

- Marquee — 文本或内容持续循环滚动。
- Loop — 重复播放的动画，次数可设或无限循环。
- Alternate (yoyo) — 每次迭代前后方向交替播放，而不是直接跳回起点。
- Orbit — 元素围绕另一元素做持续环绕运动。
- Pulse — 轻微重复的缩放或不透明度变化，用于吸引注意力。
- Float — 轻柔的上下漂浮，使静态元素看起来更有生命感和轻盈感。
- Idle animation — 元素处于等待交互时播放的细微运动。

## 精致效果 (Polish & Effects)

- Blur — 使用模糊滤镜软化元素或掩盖细小瑕疵。
- Clip-path — 将元素裁剪为形状，常用于揭示或遮罩效果。
- Mask — 通过形状或渐变隐藏或显示元素的部分，类似 clip-path 但边缘可渐隐。
- Before / after slider — 可拖动的分隔条用于比较两张叠放图片的差异。
- Line drawing — SVG 路径按顺序绘制出来，像一支看不见的笔在描线。
- Text morph — 文本在变化时逐字或逐字符动画化，突出新值。
- Skeleton / Shimmer — 加载占位条带有移动光泽，提示内容正在加载。
- Number ticker — 数字滚动或计数到某个值的效果。
- Tabular numbers — 等宽数字，避免数字变化时整体布局抖动，适用于计时器或计数器。
- Typewriter — 文本逐字符出现，像被打字机输入一样。

## 性能 (Performance)

- Frame rate (FPS) — 每秒绘制的帧数。60fps 是流畅动画的基线，更新显示器上可达 120fps。
- Jank — 当浏览器掉帧导致的可见卡顿。
- Dropped frame — 浏览器未能在绘制截止时间前渲染的一帧，导致轻微卡顿。
- Compositing — 将元素提升到独立图层并交由 GPU 处理移动或淡入，而无需重做布局或重绘。
- `will-change` — 一个 CSS 提示，用于告知浏览器元素即将发生动画，以便提前将其提升成独立图层。
- Layout thrashing — 动画频繁改变会触发布局计算的属性（如 width、height、top、left），导致掉帧。

## 需要了解的原则 (Principles to Know)

- Purposeful animation — 动画应有明确目的：指引、反馈或展示关系，而不仅仅是装饰。
- Anticipation — 在动作前的一个小反向预备动作，提示即将发生的变化。
- Follow-through — 主运动停止后，部分元素仍继续移动并逐渐停住，增强重量感。
- Squash & stretch — 通过形变传达重量、速度与柔韧性。
- Perceived performance — 合适的动画可以让界面感知上更快，即使实际速度未变。
- Frequency of use — 动画出现频率越高，应越短且越微妙。
- Spatial consistency — 在不同状态间保持元素的身份和位置一致，避免用户迷失。
- Hardware acceleration — 对 transform 和 opacity 做动画能让 GPU 提供平滑运动。
- Reduced motion — 尊重用户的 prefers-reduced-motion 设置，降低或移除动画。
