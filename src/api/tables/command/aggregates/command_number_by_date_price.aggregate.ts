export const commandPriceUpAggregate = (date: Date, price: number) => {
    const min = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0);
    const max = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 24);
    return [
        {
            $match: {
                date: {
                    $gte: min,
                    $lt: max
                },
                min_price: {
                    $gt: price,
                }
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    min_price: "$min_price",
                    date: {
                        $dateToString: {format: "%Y-%m-%d", date: "$date"}
                    },
                    time: {
                        $dateToString: {format: "%H:%M:%S", date: "$date"}
                    }
                },
                numberOfCommand: {$sum: 1}
            },
        },
        {$sort: {time: -1}},
    ]
}