import { jobs } from '../apiSchemas/jobSchema.js'; 

 const getMarketDemandStats = async (req, res) => {
    try {
        const { category } = req.query; 
        console.log(req.query)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const stats = await jobs.aggregate([
            {
                $match: {
                    category: category, 
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } } 
        ]);

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {getMarketDemandStats};