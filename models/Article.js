const mongoose = require('mongoose')
const { readingTime } = require('../utils/utils')

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    owner: {
      type: String,
    },
    state: {
      type: String,
      default: 'draft',
      enum: ['draft', 'published'],
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: Number,
    tags: [String],
    body: String,
  },
  { timestamps: true }
)

articleSchema.pre('save', function (next) {
  let article = this

  if (!article.isModified('body')) return next()

  const timeToRead = readingTime(this.body)

  article.reading_time = timeToRead
  next()
})

articleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject.owner
  },
})

articleSchema.statics.publishDrafts = async function () {
  try {
    const drafts = await this.find({ state: 'draft' });

    drafts.forEach(async (draft) => {
      // Add any condition(s) here if needed before publishing
      draft.state = 'published';
      await draft.save();
    });

    console.log(`${drafts.length} draft articles were published.`);
  } catch (err) {
    console.error('Error publishing drafts:', err.message);
  }
};

module.exports = mongoose.model('Article', articleSchema);
