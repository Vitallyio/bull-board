"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
exports.useInterval = (callback, delay) => {
    const savedCallback = react_1.useRef();
    react_1.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    react_1.useEffect(() => {
        let id;
        function tick() {
            let called = false;
            requestAnimationFrame(() => {
                var _a;
                (_a = savedCallback.current) === null || _a === void 0 ? void 0 : _a.call(savedCallback);
                called = true;
            });
            if (called === false) {
                clearInterval(id);
            }
        }
        if (delay != null) {
            id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [callback, delay]);
};
//# sourceMappingURL=useInterval.js.map