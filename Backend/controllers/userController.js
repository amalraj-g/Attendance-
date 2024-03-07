
import User from '../models/userModel.js';
//import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateToken.js';

/// @desc Auth & get token
// @route POST /api/users/login
// @access Public
const authUser = async (req, res) => {
    try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

        generateToken(res, user._id);

        res.status(200).json({message:"login succesfully"
           
    });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

}catch(error){
    console.error(`Error fetching data: ${error.message}`); 
}
}
// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
console.log(userExists)
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({name,email,password});
    if (user !== userExists) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } 
    else {
        res.status(400);
        throw new Error('Invalid user data')
    }
};

export {
    authUser,
    registerUser
    
}