const subcategorySchema = require("../Models/subcatagory.model");
const messages = require("../utils/messages.json");
const enums = require("../utils/enums.json");

module.exports = {

    addsubCategory: async (req, res) => {

        const { name, categoryId } = req.body
        try {
            const findsubCategory = await subcategorySchema.findOne({ name })
            if (findsubCategory) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.SUBCATEGORY_EXISTS });
            }

            const subCategory = await subcategorySchema.create(req.body)
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SUBCATEGORY_ADDED, subCategory });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    getsubCategory: async (req, res) => {

        try {
            const allsubCategory = await subcategorySchema.find().populate('categoryId')
            if (allsubCategory.length > 0) {
                return res
                    .status(enums.HTTP_CODE.OK)
                    .json({ success: true, subcategory: allsubCategory });
            } else {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.SUBCATEGORY_NOT_FOUND });
            }

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    updatesubCategory: async (req, res) => {
        const { id } = req.query

        try {

            const findCategory = await subcategorySchema.findById(id)
            if (!findCategory) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.SUBCATEGORY_NOT_FOUND });
            }
            await subcategorySchema.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            )
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SUBCATEGORY_UPDATED });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    deletesubCategory: async (req, res) => {
        const { id } = req.query

        try {

            await subcategorySchema.findByIdAndDelete(id)
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SUBCATEGORY_DELETED });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    }

}