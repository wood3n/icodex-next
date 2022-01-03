---
title: React 中的类型
---

## React 中的类型

在安装完`@types/react`以后，项目中随便`import`一个`React`就可以跳转到`index.d.ts`文件中，其中定义了所有的`React`库相关的子类型，其中常见的 JSX 语法下的类型有以下这些：

```typescript
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;
```

对于这些类型都可以使用`React.xxx`的形式在项目中使用，例如

```typescript
interface TodoList {
  key: string;
  value: string;
  child: React.ReactNode;
}
```

## HTML 元素类型

任何事件的触发都离不开`target`元素，在`node_modules/@types/react/global.d.ts`中定义了这些 HTML 元素的类型，所有 HTML 元素类型都继承自`HTMLElement`，这个是和原生 DOM API 相对应的。

```typescript
interface Element {}

interface HTMLElement extends Element {}

// input
interface HTMLElement extends Element {}
interface HTMLAnchorElement extends HTMLElement {}
interface HTMLAreaElement extends HTMLElement {}
interface HTMLAudioElement extends HTMLElement {}
interface HTMLBaseElement extends HTMLElement {}
interface HTMLBodyElement extends HTMLElement {}
interface HTMLBRElement extends HTMLElement {}
interface HTMLButtonElement extends HTMLElement {}
interface HTMLCanvasElement extends HTMLElement {}
interface HTMLDataElement extends HTMLElement {}
interface HTMLDataListElement extends HTMLElement {}
interface HTMLDialogElement extends HTMLElement {}
interface HTMLDivElement extends HTMLElement {}
interface HTMLDListElement extends HTMLElement {}
interface HTMLEmbedElement extends HTMLElement {}
interface HTMLFieldSetElement extends HTMLElement {}
interface HTMLFormElement extends HTMLElement {}
interface HTMLHeadingElement extends HTMLElement {}
interface HTMLHeadElement extends HTMLElement {}
interface HTMLHRElement extends HTMLElement {}
interface HTMLHtmlElement extends HTMLElement {}
interface HTMLIFrameElement extends HTMLElement {}
interface HTMLImageElement extends HTMLElement {}
interface HTMLInputElement extends HTMLElement {}
interface HTMLModElement extends HTMLElement {}
interface HTMLLabelElement extends HTMLElement {}
interface HTMLLegendElement extends HTMLElement {}
interface HTMLLIElement extends HTMLElement {}
interface HTMLLinkElement extends HTMLElement {}
interface HTMLMapElement extends HTMLElement {}
interface HTMLMetaElement extends HTMLElement {}
interface HTMLObjectElement extends HTMLElement {}
interface HTMLOListElement extends HTMLElement {}
interface HTMLOptGroupElement extends HTMLElement {}
interface HTMLOptionElement extends HTMLElement {}
interface HTMLParagraphElement extends HTMLElement {}
interface HTMLParamElement extends HTMLElement {}
interface HTMLPreElement extends HTMLElement {}
interface HTMLProgressElement extends HTMLElement {}
interface HTMLQuoteElement extends HTMLElement {}
interface HTMLSlotElement extends HTMLElement {}
interface HTMLScriptElement extends HTMLElement {}
interface HTMLSelectElement extends HTMLElement {}
interface HTMLSourceElement extends HTMLElement {}
interface HTMLSpanElement extends HTMLElement {}
interface HTMLStyleElement extends HTMLElement {}
interface HTMLTableElement extends HTMLElement {}
interface HTMLTableColElement extends HTMLElement {}
interface HTMLTableDataCellElement extends HTMLElement {}
interface HTMLTableHeaderCellElement extends HTMLElement {}
interface HTMLTableRowElement extends HTMLElement {}
interface HTMLTableSectionElement extends HTMLElement {}
interface HTMLTemplateElement extends HTMLElement {}
interface HTMLTextAreaElement extends HTMLElement {}
interface HTMLTitleElement extends HTMLElement {}
interface HTMLTrackElement extends HTMLElement {}
interface HTMLUListElement extends HTMLElement {}
interface HTMLVideoElement extends HTMLElement {}
interface HTMLWebViewElement extends HTMLElement {}
```

## 合成事件类型

在`index.d.ts`中定义了许多合成事件的类型，用于处理 HTML 事件的回调函数接收的参数类型，所有的事件类型都继承自`SyntheticEvent`这个`interface`，并且它们都可以指定触发事件的元素类型，这些元素类型

```typescript
// 合成事件实例所包含的属性
interface BaseSyntheticEvent<E = object, C = any, T = any> {
  nativeEvent: E;
  currentTarget: C;
  target: T;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  preventDefault(): void;
  isDefaultPrevented(): boolean;
  stopPropagation(): void;
  isPropagationStopped(): boolean;
  persist(): void;
  timeStamp: number;
  type: string;
}

/**
 * 合成事件类型
 * T为触发事件的HTM元素类型，例如HTMLInputElement表示是由Input触发的
 */
interface SyntheticEvent<T = Element, E = Event>
  extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}
```

### 常见的合成事件

```typescript
// 剪切板事件
ClipboardEvent;

// 输入法事件
CompositionEvent;

// 拖拽
DragEvent;

// 屏幕指针事件
PointerEvent;

// 聚焦
FocusEvent;

// 表单事件
FormEvent;

// 表单提交不生效
InvalidEvent;

// input，select，textarea元素的change事件
ChangeEvent;

// 键盘事件
KeyboardEvent;

// 鼠标事件
MouseEvent;

// 触摸屏/触摸板事件
TouchEvent;

// 用户界面事件
UIEvent;

// 滚动鼠标滚轮
WheelEvent;

// 动画事件
AnimationEvent / TransitionEvent;
```

### 使用类型断言

当使用`React`定义的合成事件处理合成事件的回调函数时，接收的第一个参数的类型往往是上述合成事件的类型，例如

```typescript
const addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const { value } = e.target;
};

<Input placeholder="请输入事项" onPressEnter={addTodo} />;
```

![image-20201011115806197](../../public/images/image-20201011115806197.png)

这里就会报错，原因是`event.target`始终是`HTMLElement`类型，它是所有 HTML 元素的父类型，要指定具体的 HTML 类型，就需要使用到类型断言语法`as`

```typescript
const addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const { value } = e.target as HTMLInputElement;
};
```

## React 特定的类型

React 还有一些特定的类型需要注意

### React.CSSProperties

JSX 中传递到`style`属性的特定 CSS 类型，不写`React.CSSProperties`其实也没关系，只不过在编辑器中的类型提示不友好，不利于开发过程中的提示。当声明为`React.CSSProperties`以后，书写该部分属性就会获得 TypeScript 强大的 JSX 的 CSS 属性提示，这也正是 TypeScript 香的原因之一！

### React.MutableRefObject

这个是 React 的`useRef` API 输出的`ref`的类型

### 自定义 hook

自定义`hook`的返回类型可以是一个元组，也可以是一个对象

```typescript
interface MyInterface {
  (name: string): [() => void];
}

const useMyHook: MyInterface = (name) => {
	return [
    ...
  ]
}
```

### forwardRef

`forwardRef`在 React 中用于传递`ref`使用，其本身是一个高阶组件，接受一个组件作为参数，组件会接受`ref`的`props`，最终返回新的组件。

在`typescript`中对于`forwardRef`的类型定义如下，其接受两个泛型参数分别是组件的`props`类型以及`ref`的类型。

```typescript
function forwardRef<T, P = {}>(
  render: ForwardRefRenderFunction<T, P>,
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
```

```typescript
export const App = React.forwardRef<Props, RefType>((props, ref) => {
  // ...
});
```