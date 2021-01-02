// Someday...this will be stored in redis
// but for now this is the best we've got

const userData = {

    "john": {
        passType: "base",
        telegram_id: process.env.JOHN_TELEGRAM_CHAT_ID,
        desiredSkiDays: {
            "winterpark": {
                "2020-12-10": {
                    hasBeenNotified: false
                },
                "2020-12-25": {
                    hasBeenNotified: true
                },
                "2021-01-09": {
                    hasBeenNotified: false
                },
                "2021-03-04": {
                    hasBeenNotified: false
                }
            },
            "taos": {
                "2021-02-25": {
                    hasBeenNotified: false
                },
                "2021-02-22": {
                    hasBeenNotified: false
                },
                "2021-02-26": {
                    hasBeenNotified: true
                },
                "2021-02-08": {
                    hasBeenNotified: false
                }
            },
            "abasin": {
                "2021-01-29": {
                    hasBeenNotified: false
                },
                "2021-02-04": {
                    hasBeenNotified: false
                },
                "2021-04-01": {
                    hasBeenNotified: false
                }
            }
        }
    },
    
    "mark": {
        passType: "base",
        telegram_id: process.env.MARK_TELEGRAM_CHAT_ID,
        desiredSkiDays: {
            "winterpark": {
                "2020-19-10": {
                    hasBeenNotified: true
                },
                "2020-13-25": {
                    hasBeenNotified: false
                },
                "2021-01-09": {
                    hasBeenNotified: false
                },
                "2021-01-04": {
                    hasBeenNotified: false
                }
            },
            "taos": {
                "2021-03-25": {
                    hasBeenNotified: false
                },
                "2021-02-12": {
                    hasBeenNotified: false
                },
                "2021-02-16": {
                    hasBeenNotified: true
                },
                "2021-04-08": {
                    hasBeenNotified: false
                }
            },
            "abasin": {
                "2021-03-29": {
                    hasBeenNotified: false
                },
                "2021-01-04": {
                    hasBeenNotified: true
                },
                "2021-03-01": {
                    hasBeenNotified: false
                }
            }
        }
    }
}


module.exports = { userData: userData };