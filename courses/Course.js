const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema(
    {
  "_id": {
    "$oid": {
      "type": "ObjectId"
    }
  },
  "title": {
    "type": "String"
  },
  "description": {
    "type": "String"
  },
  "weeks": {
    "type": "Number"
  },
  "price": {
    "type": "Number"
  },
  "minimumSkill": {
    "type": "String"
  },
  "training": {
    "type": "Number"
  }
}
)

module.exports = mongoose.model("Course", CourseSchema, "courses");
