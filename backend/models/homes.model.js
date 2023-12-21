import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        numOfBedrooms: {
            type: Number,
            required: true
        },
        numOfBathrooms: {
            type: Number,
            required: true
        },
        furnished : {
            type: Boolean,
            required: true
        },
        parking: {
            type: Boolean,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        imageUrls: {
            type: Array,
            required: true
        },
        userRef: {
            type: String,
            required: true
        }
    }, {timestamps: true}
)

const Home = mongoose.model('Home', homeSchema);

export default Home;