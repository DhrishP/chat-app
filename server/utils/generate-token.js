import jwt from 'jsonwebtoken'

const generateTokenandSetCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        maxAge:7*24*60*60*1000,
        sameSite:'strict'
    })
    return token
}

export default generateTokenandSetCookie