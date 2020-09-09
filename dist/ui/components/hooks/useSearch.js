"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const PARAMS = ['job', 'status', 'search'];
exports.useSearch = (state) => {
    react_1.useEffect(() => {
        let dirty = false;
        const params = new URLSearchParams(document.location.search);
        for (const param of PARAMS) {
            const urlValue = params.get(param);
            const stateValue = state[param];
            if (stateValue) {
                if (urlValue !== stateValue) {
                    params.set(param, stateValue.toString());
                    dirty = true;
                }
            }
            else if (urlValue) {
                // we force the search param to follow state, it's the responsibility
                // of the store to initialize from the URL
                params.delete(param);
                dirty = true;
            }
        }
        if (dirty) {
            const next = new URL(document.location.toString());
            next.search = params.toString();
            const nexturl = next.toString();
            window.history.pushState({ path: nexturl }, '', nexturl);
        }
    });
};
exports.getSearchState = () => {
    var _a;
    const returnValue = {
        search: undefined,
        status: undefined,
        job: undefined,
    };
    const params = new URLSearchParams(document.location.search);
    for (const param of PARAMS) {
        ;
        returnValue[param] = (_a = params.get(param)) !== null && _a !== void 0 ? _a : undefined;
    }
    return returnValue;
};
//# sourceMappingURL=useSearch.js.map