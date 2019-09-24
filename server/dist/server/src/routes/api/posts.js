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
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const router = express_1.default.Router();
// Get posts
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield loadPostCollection();
    res.send(yield posts.find({}).toArray());
}));
// Add post
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield loadPostCollection();
    yield posts.insertOne({ text: req.body.text, createdAt: new Date() });
    res.status(201).send();
}));
// Delete post
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield loadPostCollection();
    const id = new mongodb_1.ObjectID(req.params.id);
    yield posts.deleteOne({ _id: id });
    res.status(201).send();
}));
const loadPostCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield mongodb_1.MongoClient.connect("mongodb+srv://app:Abc123456@vue-express-x4xnq.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });
    return client.db("vue-express").collection("posts");
});
exports.default = router;
