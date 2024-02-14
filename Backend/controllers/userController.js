import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';




const authUser = async (req, res) => {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    console.log(user)
    if (user && (await User.findone({password}))) {
        
        const token = jwt.sign({name: user.name, id: user._id} ,process.env.SECRET, {expiresIn:'1hr'});
        res.status(200).json({
            _id: user._id,
            name: user.name,
            token
            });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
};

export {authUser}