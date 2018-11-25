## 前言

微信小程序官方没有自带的左滑删除功能，一般开发的时候都是使用touch事件来开发自定义的左滑删除，处理起来会有点麻烦。微信小程序出了[movable-view(点击查看官方文档)](https://developers.weixin.qq.com/miniprogram/dev/component/movable-view.html)之后，在某些特殊情况下可以使用`movable-view`来开发左滑删除功能，会比较简单一些。


## 实现原理

1. **左滑的元素高度需要是固定的**，因为`movable-view`要求必须设置width和height；

2. 删除的按钮固定在右侧，设置一定的宽度；

3. `movable-area`宽度设置为`100vw-删除按钮宽度`，`movable-view`宽度设置为`100vw`；

4. 根据`movable-view`的`x`属性来控制元素滑动，为了避免滑动到一半只显示部分按钮，可以设置滑动小于一半不再滑动时回复到初始位置，超过一半则继续滑动到底；

5. 一直拖动`movable-view`时会出现只触发`touch`事件的情况，所以需要针对`touchstart`和`touchend`事件进行特殊情况处理。


## 效果图

![左滑](https://github.com/XNAL/wxapp-movable-delete/blob/master/screenshorts/moveable.gif)



![删除](https://github.com/XNAL/wxapp-movable-delete/blob/master/screenshorts/moveable-2.gif)

