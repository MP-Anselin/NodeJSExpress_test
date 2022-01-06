export const commandNumberAggregate = (date: Date) => {
    const min = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 59);
    const max = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 24, 59);
    return [
        {
            $match: {
                date: {
                    $gte: min,
                    $lt: max
                },
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {format: "%Y-%m-%d", date: "$date"}
                },
                numberOfCommand: {$sum: 1}
            },
        },
    ]
}