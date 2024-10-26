"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_graphql_1 = require("express-graphql");
const config_1 = __importDefault(require("./config/config"));
const graphql_config_1 = __importDefault(require("./graphql_config"));
const { port } = config_1.default;
const app = (0, express_1.default)();
app.disable('x-powered-by');
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: false }));
app.use('/', (req, res) => {
    (0, express_graphql_1.graphqlHTTP)(Object.assign({}, graphql_config_1.default))(req, res);
});
app.listen(port, () => {
    console.info(`App is listening on port ${port}`);
});
//# sourceMappingURL=index.js.map