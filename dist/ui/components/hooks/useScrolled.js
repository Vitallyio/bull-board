"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
exports.useScrolled = () => {
    const [scrolled, setScrolled] = react_1.useState(typeof window === 'undefined' ? false : window.scrollY > 20);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    react_1.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
    return scrolled;
};
//# sourceMappingURL=useScrolled.js.map