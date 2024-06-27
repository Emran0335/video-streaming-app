const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
// mongodb is very intelligent, it will convert Category into caterories in the document of the mongodb database
modules.export = Category;
