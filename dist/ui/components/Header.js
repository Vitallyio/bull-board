"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const useScrolled_1 = require("./hooks/useScrolled");
exports.Header = ({ store }) => {
    const scrolled = useScrolled_1.useScrolled();
    return (react_1.default.createElement("nav", { id: "header", style: { boxShadow: scrolled ? '0 3px 3px rgba(0,0,0,0.1)' : 'none' } },
        react_1.default.createElement("span", null, "\uD83C\uDFAF Bull Dashboardzzzzzzz"),
        react_1.default.createElement("div", { className: "searchContainer" },
            react_1.default.createElement("input", { value: store.state.search, onChange: evt => store.setSearch(evt.target.value) }))));
};
//# sourceMappingURL=Header.js.map