const Router = require('express')
    userRouter = Router()
const { index, store, show, update, destroy } = require('../controllers/UserController')

userRouter.get('/', index)
userRouter.post('/', store)
userRouter.get('/:id', show)
userRouter.patch('/:id', update)
userRouter.delete('/:id', destroy)

module.exports = userRouter