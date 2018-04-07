/* eslint-disable */

const schema = {
    site: {
        active: Boolean,
        guest: {
            max: Number,
            reserved: Number,
            current: Number,
            lastUpdated: Date,
            pickupNeeded: Number,
        },
        volunteer: {
            max: Number,
            reserved: Number,
            current: Number,
            lastUpdated: Date,
        },
        pets: {
            max: Number,
            current: Number,
            lastUpdated: Date
        },
        supports: {
            ADA: Boolean,
            ageGroup: ENUM("adult", "children"),
            pets: Boolean,
        },
        siteLead: userCopy,
        shiftLead: userCopy,
        suppliesNeeded: [
            {
                name: String,
                qty: Number,
                category: String, // maybe ?
            }
        ],
        incidents: [
            {
                dateCreated: Date,
                title: String,
                type: ENUM("Fight", "Medical" , "Other"),
                description: String,
                resolved: Boolean,
                reporter: User
            }
        ],
        history: {
            [Date]: {
                incidents: [],
                suppliesNeeded: [],
                volunteerHours: []
            }
        },
    },
    user: { // volunteeer
        firstName: String,
        lastName: String,
        email: String,
        phone: Number,
        roles: [ // this is gravy. not important. roles this user can perform.
            "all", "siteLead", "shiftLead", "driver"
        ],
        stats: {
            // for funzies

        },
    },
    driver: {
        id: userId
    },
    supplies:{
        
    }
}
