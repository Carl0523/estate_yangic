import jwt from 'jsonwebtoken';

const generateToken = (response, id) => {
    const token = jwt.sign({id}, process.env.JWT_KEY, {
        expiresIn: '30d'
    });

    response.cookie("access_token", token, {
        sameSite: "strict",
        secure: false,
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })

}





export default generateToken;