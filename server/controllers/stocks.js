import express from 'express';
import mongoose from 'mongoose';

import StockStruct from '../models/stockStuct.js';

const router = express.Router();

export const getStocks = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await StockStruct.countDocuments({});
        const stocks = await StockStruct.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: stocks, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getStocksBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const stocks = await StockStruct.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: stocks });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getStock = async (req, res) => { 
    const { id } = req.params;

    try {
        const stock = await StockStruct.findById(id);
        
        res.status(200).json(stock);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createStock = async (req, res) => {
    const stock = req.body;

    const newStock = new StockStruct({ ...stock, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newStock.save();

        res.status(201).json(newStock);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateStock = async (req, res) => {
    const { id } = req.params;
    const { name, symbol, category } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No stock with id: ${id}`);

    const updatedStock = { name, symbol, category, _id: id };

    await StockStruct.findByIdAndUpdate(id, updatedStock, { new: true });

    res.json(updatedStock);
}

export const deleteStock = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No stock with id: ${id}`);

    await StockStruct.findByIdAndRemove(id);

    res.json({ message: "Stock deleted successfully." });
}


export default router;