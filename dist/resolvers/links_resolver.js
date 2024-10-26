"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const api_1 = __importDefault(require("../api"));
const linksResolver = (root) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, api_1.default)(root.url);
    const $ = (0, cheerio_1.load)(res);
    const links = $('a')
        .map(function () {
        const href = $(this).attr('href');
        if (!href) {
            return;
        }
        if (href !== '#' &&
            href.indexOf('http') > -1) {
            return href.substring(href.indexOf('http'));
        }
    })
        .get();
    return links.map((url) => ({ url }));
});
exports.default = linksResolver;
//# sourceMappingURL=links_resolver.js.map