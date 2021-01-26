import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Task = new Schema(
  {
    title: { type: String, required: true },
    list: { type: String, required: true },
    creatorId: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Task
