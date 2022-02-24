import mongoose from 'mongoose';

const stockSchema = mongoose.Schema({
    name: String,
    symbol: String,
    category: String,
    price: Number,
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    avgVolume: Number,
    mktcap: Number,
    
})

var StockStruct = mongoose.model('StockStruct', stockSchema);

export default StockStruct;