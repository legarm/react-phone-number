const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

module.exports = () => {

    //set user
    router.post('/users',
        userController.addUser
    );

    //get users
    router.get('/users',
        userController.getUsers
    );

    //get user (ID)
    router.get('/users/:id',
        userController.getUser
    );

    //update user
    router.put('/users/:id',
        userController.updateUser
    );

    router.delete('/users/:id',
        userController.deleteUser
    );

    return router;
}