import mongoose from "mongoose";

const types = ['work', 'home', 'personal'];
const contactSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
phoneNumber: {
    type: String,
    required: true
},
email: {
    type: String,
    required: false
},
isFavourite: {
    type: Boolean,
    default: false
},
contactType: {
    type: String,
    required: true,
    enum: types,
    default: 'personal',
}
},
{
    timestamps: true,
    versionKey: false,
  });

const Contact = mongoose.model('my-contact', contactSchema);

export default Contact;
