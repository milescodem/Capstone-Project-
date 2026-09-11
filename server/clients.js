import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,

  contactInfo: [
    {
      phone: String,
      address: String
    }
  ],

  emergencyContact: [
    {
      name: String,
      phone: String
    }
  ]
});

const Client = mongoose.model("Client", clientSchema, "Clients");

export default Client;