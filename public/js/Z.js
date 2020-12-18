(function() {
    'use strict';

    const ready = callback => {
        // HTML5标准的 就绪事件
        // DOMContentLoaded  DOM元素加载完成  速度比window.onload要快
        document.addEventListener('DOMContentLoaded', function fn() {
            document.removeEventListener('DOMContentLoaded', fn); // 事件触发则移除事件
            callback();
        });
    }

    const init = (selector, context) => {
        if (typeof selector === 'function') { // init函数传入的是一个回调函数 则调用就绪函数添加就绪事件
            ready(selector); // 此时的selector 是函数 添加就绪事件
            return; // 不返回新对象
        }
        // 工厂函数 创建对象
        return new Z(selector, context);
    }

    class Z extends Array {
        // 构造函数部分
        constructor(selector, context) {

            // 如果传入的是数组 将数组转换成Z对象
            if (Array.isArray(selector)) {
                super(...selector);
                return;
            }

            // context 上下文对象 应该是一个DOM元素
            // 表示 在这个context 中选择元素
            if (selector.nodeType === 1) { // 判断结果为true说明它是DOM元素
                super(selector); // 将传入的DOM元素 放入父类的构造函数 创建一个对象
            } else { // 判断结果为false 说明不是DOM元素 是选择器
                let elms = context ? context.querySelectorAll(selector) : document.querySelectorAll(selector);
                super(...elms); // new Array(div1,div2,div3,div4,div5)
            }
        }

        on(type, callback) { // 为所有被选元素添加事件
            if (typeof type === 'string' && typeof callback === 'function') {
                // console.log(this); // 公有方法的this指向的是调用者
                this.forEach(elm => {
                    elm.addEventListener(type, callback);
                })
            } else if (typeof type === 'object' && typeof type != null) {
                for (let key in type) { // 遍历对象 获得每一个属性(事件名，事件处理函数)
                    this.forEach(elm => { // 遍历所有被选择的元素 elm是每一个元素
                        elm.addEventListener(key, type[key]); // 为每一个元素 添加一个事件
                    });
                }
            }
        }

        css(style, value) { // 为所有被选择元素设置行内样式
            if (typeof style === 'string' && typeof value === 'string') {
                this.forEach(elm => {
                    elm.style[style] = value;
                });
            } else if (typeof style === 'object' && style != null) { // 判断传入的参数是对象
                for (let key in style) { // 遍历对象
                    this.forEach(elm => { // 遍历每一个被选元素
                        elm.style[key] = style[key]; // 为每一个元素添加行内样式
                    });
                }
            }

            return this; // 返回Z对象 支持链式调用
        }

        addClass(className) { // 为所有被选元素添加类名
            if (typeof className === 'string' && className) {
                this.forEach(elm => {
                    elm.classList.add(className);
                });
            }
            return this;
        }

        removeClass(className) { // 为所有被选元素删除类名
            if (typeof className === 'string' && className) {
                this.forEach(elm => {
                    elm.classList.remove(className);
                })
            }
            return this;
        }

        toggleClass(className) { // 为所有被选元素切换类名
            if (typeof className === 'string' && className) {
                this.forEach(elm => {
                    elm.classList.toggle(className);
                });
            }

            return this;
        }

        replaceClass(oldName, newName) { // 为所有被选择元素替换类名
            if (typeof oldName === 'string' && typeof newName === 'string' && oldName && newName) {
                this.forEach(elm => {
                    elm.classList.replace(oldName, newName);
                });
            }
            return this;
        }

        attr(attrName, value) {
            if (typeof attrName === 'string') {
                switch (typeof value) {
                    case 'undefined':
                        // 在不传第二个参数的情况下
                        // 返回第一个被选元素的属性值
                        return this[0].getAttribute(attrName);
                        break;
                    case 'string':
                        // 在第二个参数是字符串的情况下
                        // 为所有被选元素设置属性值
                        this.forEach(elm => {
                            elm.setAttribute(attrName, value);
                        });
                        break;
                    case 'function':
                        // 在第二个参数是函数的情况下
                        // 为每一个被选元素执行一个回调函数
                        this.forEach((elm, i) => {
                            let res = value(elm.getAttribute(attrName), i);
                            elm.setAttribute(attrName, res);
                        });
                        break;
                }
            }
        }


        removeAttr(attrName) { // 为所有被选择的元素删除属性
            if (typeof attrName === 'string' && attrName) {
                this.forEach(elm => {
                    elm.hasAttribute(attrName) && elm.removeAttribute(attrName);
                });
            }
            return this;
        }


        // -------------- 
        // 文档操作

        find(selector) {
            if (typeof selector === 'string' && selector) {
                let nodeList = [];
                this.forEach(elm => { //elm 是每一个被选元素
                    // node.querySelectorAll()
                    nodeList.push(...elm.querySelectorAll(selector));
                });
                return init(nodeList);
            }
        }

        eq(index) {
            if (typeof index === 'number' && index === parseInt(index) && !isNaN(index) && index >= 0) {
                return init(this[index]);
            }
        }

        siblings(selector) {
            let result = [];
            this.forEach(elm => {
                let sibling = Array.from(elm.parentNode.children); // 选择所有包含被选元素自身的兄弟元素
                let _index = sibling.findIndex(el => el === elm); // 查找自身索引
                sibling.splice(_index, 1);

                if (typeof selector === 'string' && selector) { // 判断是否有参数
                    let selected = Array.from(elm.parentNode.querySelectorAll(selector)); // 选择器选择父元素中所有的匹配的元素
                    // 找出两个数组中相同的元素
                    sibling = sibling.filter(item => selected.indexOf(item) > -1);
                }

                result.push(...sibling);
            });
            result = Array.from(new Set(result)); //去重
            return init(result);
        }

        children(selector) {
            let result = [];
            this.forEach(elm => {
                let domList;
                if (typeof selector === 'string' && selector) {
                    domList = Array.from(elm.querySelectorAll(selector));
                    result.push(...domList.filter(el => el.parentNode === elm));
                } else {
                    domList = Array.from(elm.children);
                    result.push(...domList);
                }
            });
            result = Array.from(new Set(result));
            return init(result);
        }

        index(elm) {
            // findIndex 查找数组指定布尔表达匹配的索引值
            // 如果没有找到则返回-1
            return this.findIndex(val => val === elm);
        }

        offset() {
            // 返回第一个被选择元素的 大小和定位位置
            return {
                left: this[0].offsetLeft,
                top: this[0].offsetTop,
                width: this[0].offsetWidth,
                height: this[0].offsetHeight
            };
        }

        // tabs(options) { // options 接收用户传入的参数 object
        //     let defaults = {
        //         ev: 'click', // 默认事件
        //         active: 'active', // 默认按钮的类名
        //         display: 'show' // 默认需要切换的DIV的类名
        //     };

        //     Object.assign(defaults, options);

        //     // 选择元素
        //     let btns = this.find('[data-type="tabs-btn"]>li');
        //     let oDiv = this.find('div[data-type="tabs-div"]');

        //     btns.on(defaults.ev, function() {
        //         let _index = btns.index(this);

        //         $(this).addClass(defaults.active).siblings('li').removeClass(defaults.active);
        //         oDiv.eq(_index).addClass(defaults.display).siblings('div').removeClass(defaults.display);
        //     });
        // }

    }


    window.$$ = init; // 将init 工厂函数 暴露给全局环境
})();