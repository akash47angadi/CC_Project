const mongoose = require('mongoose');

// Connect to your MongoDB Atlas instance
mongoose.connect('mongodb+srv://pritamgurav95272:Nt3zmHAuIWan3hdO@cluster0.xxzqufh.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

// Define your schemas and models
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imgsrc: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const ProdSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
});

const CartSchema = new mongoose.Schema({
    products: [ProdSchema],
    total: Number,
}, { timestamps: true });

const HistorySchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
    },
    curr_cart: {
        type: [ProdSchema],
    },
    cart_history: {
        type: [CartSchema],
        default: [],
    },
});

const UserModel = mongoose.model('Users', UserSchema);
const ProductModel = mongoose.model('Products', ProductSchema);
const HistoryModel = mongoose.model('History', HistorySchema);

// Function to insert specific data into the database
async function insertSpecificData() {
    try {
        // Insert a specific user
        const user = {
            email: 'user@example.com',
            password: 'securepassword123',
        };
        await UserModel.create(user);
        console.log('Specific user data inserted:', user);

        // Insert a specific product
        const product = {
            name: 'Dosa Maker',
            imgsrc: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdosa&psig=AOvVaw1McJ8Yw2dGI8pj5Qr6imwW&ust=1713791604459000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNjOqa2x04UDFQAAAAAdAAAAABAE',
            desc: 'An amazing dosa maker for perfect dosas every time.',
            price: 99,
        };
        await ProductModel.create(product);
        console.log('Specific product data inserted:', product);

        // Insert a specific history record
        const cart = {
            products: [{ product: product.name, quantity: 2 }],
            total: product.price * 2,
        };

        const history = {
            user: user.email,
            curr_cart: cart.products,
            cart_history: [cart],
        };

        await HistoryModel.create(history);
        console.log('Specific history data inserted:', history);
    } catch (error) {
        console.error('Error inserting specific data:', error);
    } finally {
        mongoose.disconnect();
    }
}

// Call the function to insert specific data
insertSpecificData();
