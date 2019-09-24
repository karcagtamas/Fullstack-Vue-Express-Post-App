"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const posts_1 = __importDefault(require("./routes/api/posts"));
const app = express_1.default();
// Middleware
app.use(body_parser_1.default.json());
app.use(cors_1.default());
// Routes
app.use("/api/posts", posts_1.default);
// Handle prods
if (process.env.NODE_ENV === "production") {
    // Static folder
    app.use(express_1.default.static(__dirname + "/public/"));
    // Handle SPA
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + "/public/index.html");
    });
}
// Port
const port = process.env.PORT || 5000;
// Run server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
