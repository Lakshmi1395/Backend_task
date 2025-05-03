/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UsersRegisterBody:
 *       type: object
 *       required:
 *         - email
 *         - password  
 *         - cpassword  
 *       properties:
 *         email:
 *           type: string
 *           example: User email
 *         password:
 *           type: string
 *           example: 123456
 *         cpassword:
 *           type: string
 *           example: 123456
 *     UsersLoginBody:
 *       type: object
 *       required:
 *         - email
 *         - password  
 *       properties:
 *         email:
 *           type: string
 *           example: sadmin@gmail.com
 *         password:
 *           type: string
 *           example: 123456
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsersRegisterBody'
 *     responses:
 *       200:
 *         description: Data Saved Success
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: login
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsersLoginBody'
 *     responses:
 *       200:
 *         description: Data Saved Success
 */

/**
 * @swagger
 * /api/user/verifyotp:
 *   post:
 *     summary: Verify Otp
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: number
 *                 example: 1428582
 *     responses:
 *       200:
 *         description: Success
 */