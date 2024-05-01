import bcrypt from 'bcryptjs'

export const signin = async(req,res)=>{
    const {email,username,password} = req.body
    if(password.length < 8){
        res.status(400).send('Password length too short')
    }
    if(!email || !username || !password){
        res.status(400).send("Please fill all the credentials")
    }
    const saltRounds = 10
    const hashedPass = await bcrypt.hash(password,saltRounds)
    

}