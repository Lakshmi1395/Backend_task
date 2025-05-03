const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const Auth = require('../middleware/auth');

/* GET users listing. */

router.post("/", Auth.AuthMiddleware, productController.createProduct);

router.get("/", Auth.AuthMiddleware, productController.getProducts);

router.get("/:id", Auth.AuthMiddleware, productController.getProductById);

router.put("/:id", Auth.AuthMiddleware, productController.updateProduct);

router.delete("/:id", Auth.AuthMiddleware, productController.deleteProduct);

module.exports = router;