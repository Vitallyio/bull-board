"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
require("./index.css");
require("./xcode.css");
const App_1 = require("./components/App");
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const basePath = window.basePath;
react_dom_1.render(react_1.default.createElement(App_1.App, { basePath: basePath }), document.getElementById('root'));
//# sourceMappingURL=index.js.map