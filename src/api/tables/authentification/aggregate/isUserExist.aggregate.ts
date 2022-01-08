export const isUserExistAggregate = (email: string) => {
    return [
        {
            $match: {
                email: {
                    $eq: email,
                },
            }
        },
    ]
}