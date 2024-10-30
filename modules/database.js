import mongoose from 'mongoose';

export const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // dbName: 'shopping-cart-test',
        });
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos');
    }
}