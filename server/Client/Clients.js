import mongoose from 'mongoose';

mongoose.Schema ({
  "_id": {
    "$oid": "6a764cce814637e01ae717b7"
  },
  "firstName": "Kelly",
  "lastName": "Duncan",
  "email": "kellydunk@aol.com",
  "contactInfo": [
    {
      "phone": {
        "$numberLong": "50788921434"
      },
      "address": "555 wonder rd"
    }
  ],
  "emergencyContact": [
    {
      "name": "Lisa Duncan",
      "phone": {
        "$numberLong": "5079934571"
      }
    }
  ]
})
mongoose.model('Client', mongoose.Schema)