import { Router } from 'express';
import { messaging } from 'firebase-admin';

const router = Router();

router.get('/send',
    async (req, res, next) => {
        try {
            const { token, title, body } = req.body;

            const resp = await messaging().send({ token, title, body })
            console.log({ resp })
            res.send(resp).status(200)
        } catch (error) {
            next(error);
        }
    }
);

export default router;