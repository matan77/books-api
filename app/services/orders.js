const Order = require('../models/order');
const Book = require('../models/book');
const mongoose = require('mongoose');

module.exports = {
    createOrder: async (orderItems) => {
        try {

            let totalPrice = 0;
            const books = await Book.find({
                _id: { $in: orderItems.map(orderItem => orderItem.bookId) },
            });
            if (books.length != orderItems.length) {
                throw new Error("some of the books not exits");
            }
            else {

                for (let i = 0; i < orderItems.length; i++) {
                    if (books[i].quantity < orderItems[i].amount) {
                        throw new Error("not enough quantity");
                    }
                    totalPrice += orderItems[i].amount * books[i].price;
                }
            }

            // update quantity
            await Promise.all(orderItems.map(orderItem => Book.updateOne(
                { _id: orderItem.bookId },
                { $inc: { quantity: - orderItem.amount } }
            )));


            // Create a new order
            const newOrder = new Order({
                items: orderItems,
                totalPrice: totalPrice
            });

            return await newOrder.save();
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    findMaxTotalPriceOrderInRange: async (startDate, endDate) => {
        try {
            return await Order.findOne({
                date: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                }
            }).sort({ totalPrice: -1 });
        } catch (error) {
            console.error('Error finding max total price order:', error);
            throw error;
        }
    },

    findMostPopularGenresInRange: async (startDate, endDate) => {
        try {
            const result = await Order.aggregate([
                {
                    $match: {
                        date:
                        {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate),
                        }
                    }
                },
                {
                    $unwind: '$items'
                },
                {
                    $lookup: {
                        from: 'books',
                        localField: 'items.bookId',
                        foreignField: '_id',
                        as: 'book'
                    }
                },
                {
                    $unwind: '$book'
                },
                {
                    $unwind: '$book.genres'
                },
                {
                    $group: {
                        _id: '$book.genres',
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { count: -1 }
                },
                {
                    $limit: 3
                }
            ]);
            const topGenres = result.map(item => item._id);

            return topGenres;

        } catch (error) {
            console.error('Error finding most popular genres:', error);
            throw error;
        }
    },

    findTotalProfitInRange: async (startDate, endDate) => {
        try {
            const result = await Order.aggregate([
                {
                    $match: {
                        date: { $gte: new Date(startDate), $lte: new Date(endDate) }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalProfit: { $sum: '$totalPrice' }
                    }
                }
            ]);

            return result.length > 0 ? result[0].totalProfit : 0;
        } catch (error) {
            console.error('Error finding total profit:', error);
            throw error;
        }
    },

    findMostBoughtAuthorsInRange: async (startDate, endDate) => {
        try {
            const result = await Order.aggregate([
                {
                  $match: {
                    date: { $gte: new Date(startDate), $lte: new Date(endDate) }
                  }
                },
                {
                  $unwind: '$items'
                },
                {
                  $lookup: {
                    from: 'books',
                    localField: 'items.bookId',
                    foreignField: '_id',
                    as: 'book'
                  }
                },
                {
                  $unwind: '$book'
                },
                {
                  $lookup: {
                    from: 'authors',
                    localField: 'book.authors',
                    foreignField: '_id',
                    as: 'author'
                  }
                },
                {
                  $unwind: '$author'
                },
                {
                  $group: {
                    _id: '$author._id',
                    name: { $first: '$author.name' },
                    totalAmount: { $sum: '$items.amount' }
                  }
                },
                {
                  $sort: { totalAmount: -1 }
                }
              ]);
          
            return result;
        } catch (error) {
            console.error('Error finding most bought authors:', error);
            throw error;
        }
    }
};
