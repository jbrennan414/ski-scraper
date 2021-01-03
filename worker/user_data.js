// Someday...this will be stored in redis
// but for now this is the best we've got

const userData = {

    "john": {
        passType: "base",
        telegram_id: process.env.JOHN_TELEGRAM_CHAT_ID,
        desiredSkiDays: {
            "winterpark": {
                "2021-01-23": {
                    hasBeenNotified: false
                },
                "2021-01-24": {
                    hasBeenNotified: false
                },
                "2021-01-10": {
                    hasBeenNotified: false
                },
                "2021-01-09": {
                    hasBeenNotified: false
                },
                "2021-01-16": {
                    hasBeenNotified: false
                },
                "2021-01-17": {
                    hasBeenNotified: false
                },
            },
            "abasin": {
                "2021-01-27":{ // this is a test
                    hasBeenNotified: false
                },
                "2021-02-06": {
                    hasBeenNotified: false
                },
                "2021-02-13":{ //blackout date
                    hasBeenNotified: false
                },
                "2021-02-07": {
                    hasBeenNotified: false
                },
                "2021-02-14": {
                    hasBeenNotified: false
                },
                "2021-02-20": {
                    hasBeenNotified: false
                },
                "2021-02-21": {
                    hasBeenNotified: false
                },
                "2021-02-27": {
                    hasBeenNotified: false
                },
                "2021-02-28": {
                    hasBeenNotified: false
                }
            },
            "taos": {
                "2021-03-13": {
                    hasBeenNotified: false
                },
                "2021-03-14": {
                    hasBeenNotified: false
                },
                "2021-03-20": {
                    hasBeenNotified: false
                },
                "2021-03-21": {
                    hasBeenNotified: false
                },
                "2021-03-27": {
                    hasBeenNotified: false
                },
                "2021-03-28": {
                    hasBeenNotified: false
                },
            }
        }
    },
    // "louis": {
    //     passType: "base",
    //     telegram_id: process.env.LOUIS_TELEGRAM_CHAT_ID,
    //     desiredSkiDays: {
    //         "winterpark": {
    //             "2021-02-13": {
    //                 hasBeenNotified: false
    //             },
    //         },
    //     }
    // },
    "mark": {
        passType: "base",
        telegram_id: process.env.MARK_TELEGRAM_CHAT_ID,
        desiredSkiDays: {
            "winterpark": {
                "2021-02-13": {
                    hasBeenNotified: false
                },
            },
            "abasin": {
                "2021-01-23": {
                    hasBeenNotified: false
                },
                "2021-01-24": {
                    hasBeenNotified: false
                },
                "2021-01-10": {
                    hasBeenNotified: false
                },
                "2021-01-09": {
                    hasBeenNotified: false
                },
                "2021-01-16": {
                    hasBeenNotified: false
                },
                "2021-01-17": {
                    hasBeenNotified: false
                },
            },
            "taos": {
                "2021-03-06": {
                    hasBeenNotified: false
                },
                "2021-03-07": {
                    hasBeenNotified: false
                },
                "2021-01-04": {
                    hasBeenNotified: false
                },
            }
        }
    }
}


module.exports = { userData: userData };