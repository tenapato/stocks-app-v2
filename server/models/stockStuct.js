import mongoose from 'mongoose';

const stockSchema = mongoose.Schema({
    name: String,
    symbol: String,
    category: String,
    price: Number,
    ticker: [{
        high: Number,
        low: Number,
        close: Number,
        volume: Number,
        divident: Number,
    }]
    
})

var StockStruct = mongoose.model('StockStruct', stockSchema);

export default StockStruct;