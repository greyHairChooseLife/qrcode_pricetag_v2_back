"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const method_override_1 = __importDefault(require("method-override"));
const supplierRouter_1 = __importDefault(require("./routers/supplierRouter"));
const productRouter_1 = __importDefault(require("./routers/productRouter"));
const priceRouter_1 = __importDefault(require("./routers/priceRouter"));
const customerRouter_1 = __importDefault(require("./routers/customerRouter"));
const clerkRouter_1 = __importDefault(require("./routers/clerkRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: '1mb' }));
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express_1.default.static('src/statics'));
app.use((0, cors_1.default)()); //enble pre-flight
app.use((0, method_override_1.default)('_method'));
app.use('/supplier', supplierRouter_1.default);
app.use('/product', productRouter_1.default);
app.use('/price', priceRouter_1.default);
app.use('/customerCart', customerRouter_1.default);
app.use('/clerk', clerkRouter_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}`);
});
