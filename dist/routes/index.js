"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryPoint = (req, res) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const basePath = req.proxyUrl || req.baseUrl;
    res.render('index', {
        basePath,
    });
};
//# sourceMappingURL=index.js.map