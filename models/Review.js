const mongooes = require('mongoose');

const ReviewSchema = new mongooes.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please add a rating between 1 and 5']
    },
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a title for the review'],
        maxlength: 100
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment']
    },
    user: {
        type: mongooes.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongooes.Schema.ObjectId,
        ref: 'Product',
        required: true
    }
},
{
    timestamps: true
});

// Prevent user from submitting more than one review per product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });


module.exports = mongooes.model('Review', ReviewSchema);