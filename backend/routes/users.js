const Router = require('express')
    userRouter = Router()
const { index, store, show, update, destroy } = require('../controllers/UserController')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - paternal_lastname
 *         - mother_lastname
 *         - age
 *         - birthdate
 *         - phone
 *         - country
 *         - state
 *         - city
 *         - postal_code
 *         - language
 *         - marital_status
 *         - hobbies
 *         - preferences
 *       properties:
 *         _id:
 *           type: String
 *           description: The auto-generated id of the user
 *         name:
 *           type: String
 *           description: The User's name
 *         paternal_lastname:
 *           type: String
 *           description: The User's lastname
 *         mother_lastname:
 *           type: String
 *           description: The User's mother lastname
 *         age:
 *           type: Number
 *           description: The User's age
 *         birthdate:
 *           type: Date
 *           description: The User's birthdate
 *         phone:
 *           type: String
 *           description: The User's phone
 *         country:
 *           type: String
 *           description: The User's country
 *         state:
 *           type: String
 *           description: The User's state
 *         city:
 *           type: String
 *           description: The User's city
 *         postal_code:
 *           type: String
 *           description: The User's postal_code
 *         language:
 *           type: String
 *           description: The User's language
 *         marital_status:
 *           type: String
 *           description: The User's marital_status
 *         hobbies:
 *           type: [String]
 *           description: The User's hobbies
 *         preferences:
 *           type: [String]
 *           description: The User's preferences
 *         deleted_at:
 *           type: boolean
 *           description: Whether he was deleted
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was updated
 *       example:
 *         _id: 63ec1846f5622b7ae3b5c2b1
 *         name: Jose
 *         paternal_lastname: Perez
 *         mother_lastname: Gomez
 *         age: 20
 *         birthdate: 2000-02-24T00:00:00.000Z
 *         phone: 3213213215
 *         country: México
 *         state: Chiapas
 *         city: Tuxtla
 *         postal_code: 29990
 *         language: Spanish
 *         marital_status: Married
 *         hobbies: ["Play Music", "Play Videogames"]
 *         preferences: ["Cold", "Coffe"]
 *         deleted_at: false
 *         createdAt: 2023-02-14T23:24:54.826Z
 *         updatedAt: 2023-02-14T23:24:54.826Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints
 * /api/users:
 *   get:
 *     summary: Lists all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Body error
 *       500:
 *         description: Some server error
 */
userRouter.get('/', index)
userRouter.post('/', store)
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints
 * /api/users/{_id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some server error
 *   put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: _id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Body error
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some server error happened
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
userRouter.get('/:id', show)
userRouter.patch('/:id', update)
userRouter.delete('/:id', destroy)

module.exports = userRouter