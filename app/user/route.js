const express = require('express');
const AuthenticationToken = require('../../middleware/AuthenticationToken');
const { handlerGetAllUser, handlerPostUser, handlerPutUser, handlerDeleteUser, handlerFindByPk, handlerLoginUser } = require('./handler');
const router = express.Router();

// method get users
router.get('/', handlerGetAllUser);

//method create user
router.post('/', AuthenticationToken, handlerPostUser);

//method update user
router.put('/:id', AuthenticationToken, handlerPutUser);

//method delete user
router.delete('/:id', AuthenticationToken, handlerDeleteUser);

//method find user by id
router.get('/:id', AuthenticationToken, handlerFindByPk)

//login api
router.post('/login', handlerLoginUser);


module.exports = router;

