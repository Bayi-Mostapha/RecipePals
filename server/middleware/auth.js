import jsonwebtoken from 'jsonwebtoken'

export default function auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.id;
        req.userId = userId;
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token, please login' });
    }
}