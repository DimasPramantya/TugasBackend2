const {User} = require('../../models')
const {validateUserCreatePayload,validateUserUpdatePayload, validateUserLoginPayload} = require('../../validator/user/index');
const bcrypt = require("bcrypt");
const { generateAccessToken } = require('../../utils/tokenManager');

module.exports = {
    handlerGetAllUser : async (req,res, next) => {
        try {
            const users = await User.findAll();
            const showUser = await users.map((e) => {
                const { id, fullName, shortName, photo, password } = e;
                return { id, fullName, shortName, photo, password }
            })
            res.status(200).json(showUser);
        } catch (error) {
            next(error)
        }
    },
    handlerPostUser: async (req,res,next) => {
        try{
            const { email, password, fullName, shortName, biodata, angkatan, jabatan } = req.body;
            validateUserCreatePayload(req.body);
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                password: hashPassword, email, fullName, shortName, biodata, angkatan, jabatan,
            })
            res.status(200).json({
                status: "success",
                message: "Succesfully create user",
                data: {
                    id: user.id, email: user.email, fullName: user.fullName, shortName: user.shortName,
                    biodata: user.biodata, angkatan: user.angkatan, jabatan: user.jabatan
                }
            })
        }catch(error){
            next(error)
        }
    },
    handlerPutUser: async (req,res, next) => {
        try{
            const { id } = req.params;
            const { fullName, shortName, biodata, angkatan, jabatan } = req.body;
            validateUserUpdatePayload({ id, fullName, shortName, biodata, angkatan, jabatan });
            const user = await User.findByPk(id);
            if (!user) {
                res.status(404).json({
                    message: `User with ${id} doesn't exist!!!`
                })
            } else {
                await user.update({
                    fullName, shortName, biodata, angkatan, jabatan
                });
                res.status(200).json({ status: "success", message: "Successfully update user" });
            }
        }catch(error){
            next(error)
        }     
    }, handlerDeleteUser: async (req, res,next) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                res.status(404).json({
                    message: `User with id ${id} doesn't exist!!!`
                })
            } else {
                await user.destroy();
                res.status(200).json({ status: "success", message: "Successfully delete user" });
            }
        } catch (error) {
            next(error)
        }
    }, handlerFindByPk: async (req,res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                res.status(404).json({
                    message: `User with id ${id} doesn't exist!!!`
                })
            } else {
                res.status(200).json({ status: "success", message: "Successfully get user by id", data: user });
            }   
        } catch (error) {
            next(error);
        }
    }, handlerLoginUser: async (req,res,next) => {
        try{
            const {email,password} = req.body;
            validateUserLoginPayload({email,password});
            const user = await User.findOne({
                where: {
                    email,
                },
            });
            if(!user){
                throw new Error("User not found!!!");
            }

            const passwordValid = bcrypt.compareSync(password, user.password);
            if(!passwordValid){
                throw new Error("Invalid password")
            }
            const accessToken = generateAccessToken({
                fullName: user.fullName,
                id: user.id,
                jabatan: user.jabatan,
                email: user.email
            })
            res.status(200).json({
                status: "success",
                message: "Successfully login user",
                data: {
                    user,
                    accessToken,
                },
            })
        }catch(error){
            next(error);
        }
    }
}