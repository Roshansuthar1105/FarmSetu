import jwt from 'jsonwebtoken';
const generateTokenAndSetCookie= (userId,time, res)=>{
    const token= jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:time??'30d'
    });
    res.cookie('jwt',token, {
        maxAge: 15*24*60*60*1000,
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV !=='development'
    })
    return token;
}
export default generateTokenAndSetCookie;