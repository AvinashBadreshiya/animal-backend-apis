const Joi = require('joi')
const enums = require("../utils/enums.json")

module.exports = {

    validatation4signup: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            phone: Joi.any(),
            image: Joi.string(),
            password: Joi.string().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4login: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4updateuser: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string(),
            address: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            pincode: Joi.number().allow(null, ""),
            country: Joi.string(),
            image: Joi.string(),
            phone: Joi.number().allow(null, ""),
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4forgotpass: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4verifyOTP: (req, res, next) => {
        let schema = Joi.object().keys({
            otp: Joi.number().required(),
            email: Joi.string().email().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4verifypassword: (req, res, next) => {
        let schema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string().email().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4changepassword: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            oldPassword: Joi.string().required(),
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addcategory: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addsubcategory: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string().required(),
            categoryId: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4updatesubcategory: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4updatecategory: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addcolor: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string().required(),
            categoryId: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4createvendor: (req, res, next) => {
        let schema = Joi.object().keys({
            bankName: Joi.string().required(),
            accountNumber: Joi.number().required(),
            ifscCode: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4loginadmin: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addproduct: (req, res, next) => {
        let schema = Joi.object().keys({
            animalType: Joi.string().required(),
            categoryId: Joi.string().required(),
            breedType: Joi.string().required(),
            age: Joi.string().required(),
            weight: Joi.string().required(),
            price: Joi.string().required(),
            desc: Joi.string().required(),
            color: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            frontPhoto: Joi.string().required(),
            backPhoto: Joi.string().required(),
            lumpiCertificate: Joi.string().required(),
            generalReport: Joi.string().required(),
            phone: Joi.number().required(),
            milk: Joi.string().allow(null, ""),
            isCalf: Joi.boolean().allow(null, ""),
            lactation: Joi.string().allow(null, ""),
            calfAge: Joi.string().allow(null, ""),
            calfGender: Joi.string().allow(null, "")
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4updateproduct: (req, res, next) => {
        let schema = Joi.object().keys({
            animalType: Joi.string(),
            categoryId: Joi.string(),
            breedType: Joi.string(),
            age: Joi.string(),
            weight: Joi.string(),
            price: Joi.string(),
            desc: Joi.string(),
            color: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            phone: Joi.number(),
            milk: Joi.string(),
            isCalf: Joi.boolean(),
            frontPhoto: Joi.string(),
            backPhoto: Joi.string(),
            lumpiCertificate: Joi.string(),
            generalReport: Joi.string(),
            lactation: Joi.string(),
            calfAge: Joi.string(),
            calfGender: Joi.string().allow(null, "")
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addBlog: (req, res, next) => {
        let schema = Joi.object().keys({
            title: Joi.string().required(),
            desc: Joi.string().required(),
            image: Joi.string().required(),
            author: Joi.string().required(),
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4updateBlog: (req, res, next) => {
        let schema = Joi.object().keys({
            title: Joi.string(),
            desc: Joi.string(),
            image: Joi.string(),
            author: Joi.string(),
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addservice: async (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            type: Joi.string().required(),
            image: Joi.string().required(),
            data: Joi.object().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    }

}