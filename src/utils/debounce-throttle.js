/**
 * 防抖
 * @param {*} fn  待包装的事件回调
 * @param {*} delay 每次推迟执行的等待时间
 */
export function debounce(fn, delay = 500) {
    // 利用闭包保存同一个定时器
    let timer = null;
    return () => {
        // 取debounce执行作用域的this
        let _self = this;
        // 利用闭包保存参数数组
        let _arg = arguments;
        // 不断执行函数，那么将定时器删除
        if (timer) {
            clearTimeout(timer)
        }
        // 设定新计时器
        timer = setTimeout(() => {
            // 用apply指向调用debounce的对象，相当于_this.handler(args);
            fn.apply(_self, _arg)
        }, delay);
    }
}


/**
 * 节流
 * 保证第一次和最后一次都执行
 * @param {*} fn 待包装的事件回调
 * @param {*} delay 每次推迟执行的等待时间
 */
export function throttle(fn, delay = 500) {
    // 上一次执行时间
    let last = 0;
    // 利用闭包保存同一个定时器
    let timer = null;
    return function () {
        // 取debounce执行作用域的this
        let _self = this;
        // 利用闭包保存参数数组
        let _arg = arguments;

        // 当前时间
        let now = Date.now();
        // 上一次执行到这次执行的中间间隔时间 和 等待时间 之间的差值
        // 如果小于0，表示可以执行了；如果大于>=0，表示还未到执行时间
        let duration = delay - (now - last);
        // 清除定时器，保证最后一次执行
        if (timer) {
            clearTimeout(timer);
        }
        if (duration < 0) {
            fn.apply(_self, _arg);
            last = now;
        } else {
            // 还未到执行时间，如果这是最后一次执行，则等待duration时间后，将会执行回调函数
            timer = setTimeout(() => {
                fn.apply(_self, _arg);
            }, duration);
        }
    }
}