import user_model from './model.js'
import {generate_token} from '../../helper/jwt.js'
import {redis_set,redis_del} from '../../helper/redis.js'

class Controller {
    static async register(req, res) {
        const { userName, accountNumber, emailAddress, identityNumber } = req.body

        try {
            if(!userName){
                return res.status(412).json({ status: 412, message: "username is required" })
            }
            if(!emailAddress){
                return res.status(412).json({ status: 412, message: "email is required" })
            }
            if(!identityNumber){
                return res.status(412).json({ status: 412, message: "identity number is required" })
            }
            if(!accountNumber){
                return res.status(412).json({ status: 412, message: "account number is required" })
            }

            const check_user = await user_model.findOne({$or: [{ userName },{ identityNumber},{ accountNumber }]});

            if(check_user){
                return res.status(409).json({ status: 409, message: "username/account number/identity number exists" })
            }
            
            const result = await user_model.create({userName, accountNumber, emailAddress, identityNumber})
            await redis_del()

            res.status(200).json({ status: 200, message: "success", data: [result] })
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

    static async update(req, res) {
        const { userName, accountNumber, emailAddress, identityNumber } = req.body

        try {
            if(!req.params.id){
                return res.status(412).json({ status: 412, message: "id is required" })
            }
            const data = await user_model.findOneAndUpdate({ _id: req.params.id }, { userName, accountNumber, emailAddress, identityNumber })
            if(!data){
                return res.status(404).json({ status: 404, message: "id not found" })
            }
            await redis_del(`:${req.params.id}`)
            await redis_del()

            res.status(200).json({ status: 200, message: "success" })
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

    static async delete(req, res) {
        const { id } = req.body

        try {
            const data = await user_model.findByIdAndDelete({ _id: id })
            if(!data){
                return res.status(404).json({ status: 404, message: "id not found" })
            }
            await redis_del(`:${id}`)
            await redis_del()

            res.status(200).json({ status: 200, message: "success" })
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

    static async list(req, res) {

        try {
            const data = await user_model.find();
            await redis_set(null,JSON.stringify(data))

            res.status(200).json({ status: 200, message: "success", data })
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

    static async details_by_id(req, res) {
        const { id } = req.params

        try {
            const data = await user_model.find({_id:id});
            if(data.length == 0){
                return res.status(404).json({ status: 404, message: "id not found" })
            }
            await redis_set(`:${id}`,JSON.stringify(data))

            res.status(200).json({ status: 200, message: "success", data })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }
    static async details_by_account_number(req, res) {
        const { accountNumber } = req.params

        try {
            const data = await user_model.find({accountNumber:accountNumber});
            if(data.length == 0){
                return res.status(404).json({ status: 404, message: "id not found" })
            }
            await redis_set(`:${accountNumber}`,JSON.stringify(data))

            res.status(200).json({ status: 200, message: "success", data })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

    static async details_by_identity_number(req, res) {
        const { identityNumber } = req.params

        try {
            const data = await user_model.find({identityNumber});
            if(data.length == 0){
                return res.status(404).json({ status: 404, message: "id not found" })
            }
            await redis_set(`:${identityNumber}`,JSON.stringify(data))

            res.status(200).json({ status: 200, message: "success", data })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

    static async generate_token(req, res) {
        const { id } = req.params
        try {
            const check_user = await user_model.findOne({_id:id});

            if(!check_user){
                return res.status(404).json({ status: 404, message: "id not found" })
            }

            const token = generate_token({id:check_user._id, userName:check_user.userName, accountNumber:check_user.accountNumber, emailAddress:check_user.emailAddress, identityNumber:check_user.identityNumber})

            res.status(200).json({ status: 200, message: "success", data:[{token}] })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }
}

export default Controller;