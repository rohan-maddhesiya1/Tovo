
import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!(username && email && password)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await User.create(newUser);
        res.status(201).json({ message: "User registered successfully" , newUserId: newUser._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const loginUser = async (req,res)=>{
    const {email,password} = req.body;

    try{
        if(!(email && password)){
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
