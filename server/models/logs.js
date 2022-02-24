import mongoose from 'mongoose';

const logsSchema = mongoose.Schema({
    stocks: [
        {
            stock_uuid: String, 
            accesedCount: {type: String, default: 0},
            lastAccesed: {type: Date}
        },
    ]  
});

var logsSchema = mongoose.model('logsSchema', logSchema);

export default logsSchema;