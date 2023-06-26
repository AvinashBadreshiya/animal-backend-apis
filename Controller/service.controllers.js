const serviceSchema = require("../Models/services.model");
const messages = require("../utils/messages.json");
const enums = require("../utils/enums.json");
const { transportationService, accessoryService, veterinaryService, insuranceService } = require("../utils/mail-service")

module.exports = {

    addservice: async (req, res) => {
        try {
            const findService = await serviceSchema.findOne({ email: req.body.email })
            if (findService) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.SERVICE_EXISTS });
            }

            await serviceSchema.create(req.body)
            return res

                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SERVICE_ADDED });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    getservice: async (req, res) => {

        try {
            const service = await serviceSchema.find().sort({ "createdAt": -1 })
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, service: service });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    deleteservice: async (req, res) => {
        const { id } = req.query

        try {
            const findservice = await serviceSchema.findById(id)
            if (!findservice) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.SERVICE_NOT_FOUND });
            }

            await serviceSchema.findByIdAndDelete(id)
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SERVICE_DELETED });
        } catch (error) {
            console.log(error)
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    hireService: async (req, res) => {
        try {   
            const { id } = req.query
            const service = await serviceSchema.findById(id)
            if (!service) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.SERVICE_NOT_FOUND });
            }
            let data = {}
            let mailData = {
                to: req.user.email,
                name: req.user.name
            }
            console.log(service)
            if (service.type === "Transportation") {
                data = {
                    driver_name: service.data.driver_name,
                    driver_no: service.data.driver_no,
                    vehicleType: service.data.vehicleType,
                    licenceNumber: service.data.licenceNumber,
                    rcbook: service.data.rcbook,
                    driverDescription: service.data.driverDescription,
                    type: service.type
                }
                mailData = { ...mailData, data: data, subject:"Animalll || Hire service" }
                
                await transportationService(mailData)
            } else if (service.type === "Accessories") {
                data = {
                    accessory_name: service.data.accessory_name,
                    accessory_price: service.data.accessory_price,
                    accessory_description: service.data.accessory_description,
                    accessory_link: service.data.accessory_link,
                    type: service.type
                }
                mailData = { ...mailData, data: data, subject:"Animalll || Hire service" }
                
                await accessoryService(mailData)
            } else if (service.type === "Veterinary") {
                data = {
                    doctor_name: service.data.doctor_name,
                    doctor_no: service.data.doctor_no,
                    slot: service.data.slot,
                    visitng_address: service.data.visitng_address,
                    Doctor_description: service.data.Doctor_description,
                    doctor_degree: service.data.doctor_degree,
                    type: service.type
                }
                mailData = { ...mailData, data: data, subject:"Animalll || Hire service" }
                
                await veterinaryService(mailData)
            } else if (service.type === "Insurance") {
                data = {
                    company_name: service.data.company_name,
                    policy_description: service.data.policy_description,
                    insaurance_address: service.data.insaurance_address,
                    insaurance_no: service.data.insaurance_no,
                    company_link: service.data.company_link,
                    type: service.type
                }
                mailData = { ...mailData, data: data, subject:"Animalll || Hire service" }
                
                await insuranceService(mailData)
            }
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SERVICE_EMAIL_SEND });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    }

}