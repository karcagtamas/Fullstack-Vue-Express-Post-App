"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Post {
    constructor(id, text, createdAt) {
        this._id = id;
        this.text = text;
        this.createdAt = createdAt;
    }
}
exports.default = Post;
