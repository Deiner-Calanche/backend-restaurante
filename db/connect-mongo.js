const mongoose = require('mongoose');
require('dotenv').config();

const getConnection = async () => {
    try {
        const url = 'mongodb+srv://deinercalanche:123456Dei@clusterrestaurante.os3tzyh.mongodb.net/restauranteDB?retryWrites=true&w=majority&appName=ClusterRestaurante';


        await mongoose.connect(url);

        console.log('✅ Conexión a MongoDB Atlas exitosa');
    } catch (error) {
        console.error('❌ Error de conexión a MongoDB:', error);
    }
};

module.exports = {
    getConnection,
};