const User = require('../models/User');


exports.addUser = async (req, res, next) =>{

    const user = new User(req.body);

    //validate
    const isExistPhone = await User.findOne({phone: user.phone}) || false;
    
    if(isExistPhone === false){
        try {
            await user.save();
            res.json({mensaje: 'Se añadió un nuevo registro correctamente'});
        } catch (error) {
            console.log(error);
            next();
        }
    }else{
        res.status(404).json({
            ok:false,
            menssage: "El numero ya existe"
        })
    };
}

exports.getUsers = async (req, res, next) =>{
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.getUser = async (req, res, next) =>{
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.updateUser = async (req, res, next) =>{
    try {
        const user = await User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true
        });
        res.json(user);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.deleteUser = async (req, res, next) =>{
    try {
        await User.findOneAndDelete({_id: req.params.id});
        res.json({mensaje: 'El paciente fue eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}