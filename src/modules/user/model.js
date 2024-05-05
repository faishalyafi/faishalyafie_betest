import mongoose from 'mongoose';

const user = mongoose.model('user',{
    userName : {
        type: String, 
        required: true
    },
    accountNumber: {
        type: String, 
        required: true
    },
    emailAddress: {
        type: String, 
        required: true
    },
    identityNumber: {
        type: String, 
        required: true
    }
},'user');

export default user