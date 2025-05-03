/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     productRequestBody:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - user_id
 *       properties:
 *         name:
 *           type: string
 *           example: sample
 *         description:
 *           type: string
 *           example: description
 *         price:
 *           type: number
 *           example: 120
 *         user_id:
 *           type: number
 *           example: 1
 *     produtResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */

/**
 * @swagger
 * /api/user/product:
 *   post:
 *     summary: Add Product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/productRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/user/product/{id}:
 *   put:
 *     summary: Update Product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/productRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/user/product/{id}:
 *   delete:
 *     summary: Delete Product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: product ID
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /api/user/product/{id}:
 *   get:
 *     summary: Get Product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: product ID
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /api/user/product:
 *   get:
 *     summary: List Product
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter user by id
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter Role by name
 *       - in: query
 *         name: is_deleted
 *         schema:
 *           type: string
 *           enum: ["true", "false"]
 *         required: false
 *         description: Filter by deletion status (true or false)
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         required: false
 *         example: 1
 *         description: no of page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         required: false
 *         example: 10
 *         description: limit per page record
 *     responses:
 *       200:
 *         description: Success
 */