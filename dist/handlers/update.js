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
exports.deleteUpdate = exports.updateUpdate = exports.createUpdate = exports.getUpdates = exports.getOneUpdate = void 0;
const db_1 = __importDefault(require("../db"));
// Helper function to send error responses
const sendError = (res, status, message) => {
    res.status(status).json({ error: message });
};
// Get one update
const getOneUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return sendError(res, 400, "Update ID is required");
        }
        const update = yield db_1.default.update.findUnique({
            where: {
                id,
            },
        });
        if (!update) {
            return sendError(res, 404, "Update not found");
        }
        res.json({ data: update });
    }
    catch (error) {
        console.error(error);
        sendError(res, 500, "Internal Server Error");
    }
});
exports.getOneUpdate = getOneUpdate;
// Get all updates
const getUpdates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield db_1.default.product.findMany({
            where: {
                belongsToId: req.user.id,
            },
            include: {
                updates: true,
            },
        });
        const updates = products.reduce((allUpdates, product) => {
            return [...allUpdates, ...product.updates];
        }, []);
        res.json({ data: updates });
    }
    catch (error) {
        console.error(error);
        sendError(res, 500, "Internal Server Error");
    }
});
exports.getUpdates = getUpdates;
// Create an update
const createUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, title, body } = req.body;
        if (!productId || !title || !body) {
            return sendError(res, 400, "Product ID, title, and body are required");
        }
        const product = yield db_1.default.product.findUnique({
            where: {
                id: productId,
            },
        });
        if (!product) {
            return sendError(res, 404, "Product not found");
        }
        const update = yield db_1.default.update.create({
            data: {
                title,
                body,
                product: { connect: { id: product.id } },
            },
        });
        res.json({ data: update });
    }
    catch (error) {
        console.error(error);
        sendError(res, 500, "Internal Server Error");
    }
});
exports.createUpdate = createUpdate;
// Update an update
const updateUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { title, body } = req.body;
        if (!id) {
            return sendError(res, 400, "Update ID is required");
        }
        const products = yield db_1.default.product.findMany({
            where: {
                belongsToId: req.user.id,
            },
            include: {
                updates: true,
            },
        });
        const updates = products.reduce((allUpdates, product) => {
            return [...allUpdates, ...product.updates];
        }, []);
        const match = updates.find((update) => update.id === id);
        if (!match) {
            return sendError(res, 403, "You are not permitted to update this update");
        }
        const updateUpdate = yield db_1.default.update.update({
            where: {
                id,
            },
            data: {
                title,
                body,
            },
        });
        res.json({ data: updateUpdate });
    }
    catch (error) {
        console.error(error);
        sendError(res, 500, "Internal Server Error");
    }
});
exports.updateUpdate = updateUpdate;
// Delete an update
const deleteUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return sendError(res, 400, "Update ID is required");
        }
        const products = yield db_1.default.product.findMany({
            where: {
                belongsToId: req.user.id,
            },
            include: {
                updates: true,
            },
        });
        const updates = products.reduce((allUpdates, product) => {
            return [...allUpdates, ...product.updates];
        }, []);
        const match = updates.find((update) => update.id === id);
        if (!match) {
            return sendError(res, 403, "You are not permitted to delete this update");
        }
        const deleted = yield db_1.default.update.delete({
            where: {
                id,
            },
        });
        res.json({ data: deleted });
    }
    catch (error) {
        console.error(error);
        sendError(res, 500, "Internal Server Error");
    }
});
exports.deleteUpdate = deleteUpdate;
//# sourceMappingURL=update.js.map