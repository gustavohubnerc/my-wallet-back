export default function validateSchema (schemas) {
    return (req, res, next) => {
        const { error } = schemas.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(422).send(error.details[0].message);
        }
        next();
    };
}