import mongoose from 'mongoose'
const Schema = mongoose.Schema

const List = new Schema(
  {
    Title: { type: String, required: true }

  }
)

export default List
