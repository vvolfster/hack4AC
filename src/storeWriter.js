/* import this into your pages and call its functions to write. Make sure all functions herein return promises */
import lodash from "lodash"

const writer = {
    base: {
        store: null // dont touch . intantiated from main.js plugin
    },
    user: {
        name: "users",
        updateDetails(userId, { firstName, lastName, phone }){
            return writer.base.store.dispatch(`${this.name}/updateUserDetails`, {
                userId,
                details: { firstName, lastName, phone }
            })
        },
        toggleUserOnSite(siteId) {
            return writer.base.store.dispatch(`${this.name}/toggleOnSite`, { siteId })
        },
        toggleLead(role, siteId) {
            return writer.base.store.dispatch(`${this.name}/toggleLead`, { siteId, role })
        }
    },
    userAdmin: {
        name: "users",
        inviteUser(email) {
            return writer.base.store.dispatch(`${this.name}/inviteUser`, email)
        },
        updateUserProfile(userId, profileInfo){
            return writer.base.store.dispatch(`${this.name}/updateUserProfile`, { userId, profileInfo })
        },
        acceptInvite(userId, compositeInviteId, profileInfo) {
            return writer.base.store.dispatch(`${this.name}/acceptInvite`, { userId, compositeInviteId, profileInfo })
        },
        setActiveState(userId, value){
            return writer.base.store.dispatch(`${this.name}/setUserActiveState`, { userId, value })
        }
    },
    site: {
        name: "site",
        updateTransitCount(siteId, type, number){
            if(typeof number !== 'number')
                return Promise.reject()

            return writer.base.store.dispatch(`${this.name}/updateTransitCount`, { siteId, type, number })
        },
        reportIncident(siteId) {
            return writer.base.store.dispatch(`${this.name}/reportIncident`, { siteId })
        },
        clearAllIncidents(siteId) {
            return writer.base.store.dispatch(`${this.name}/clearAllIncidents`, { siteId })
        },
        updateCurrentQty(siteId, type, number) {
            if(typeof number !== 'number')
                return Promise.reject()

            return writer.base.store.dispatch(`${this.name}/updateCurrentQty`, { siteId, type, number })
        },
        updateSuppliesNeeded(siteId, suppliesNeededArr) {
            if(!suppliesNeededArr)
                return Promise.reject(new Error(`supplies needed was falsy`))

            if(!siteId)
                return Promise.reject(new Error(`no siteId`))

            const suppliesNeeded = lodash.isArray(suppliesNeededArr) ? suppliesNeededArr : [suppliesNeededArr]
            if(!lodash.every(suppliesNeeded, supply => supply.name && lodash.isNumber(supply.qty) && supply.qty >= 0))
                return Promise.reject(new Error("one of the supplies did not match requirement of name:String & qty: Number"))

            return writer.base.store.dispatch(`${this.name}/updateSuppliesNeeded`, { siteId, suppliesNeeded })
        },
        logVolunteerHours(siteId, volunteerCounts, volunteerHours) {
            return writer.base.store.dispatch(`${this.name}/logVolunteerHours`, { siteId, count: volunteerCounts, hours: volunteerHours })
        },
        addSite(siteData) {
            return writer.base.store.dispatch(`${this.name}/addSite`, { siteData })
        },
        updateSite(siteId, siteData) {
            return writer.base.store.dispatch(`${this.name}/updateSite`, { siteId, siteData })
        }
    },
    org: {
        createOrg(orgInfo) {
            console.log("Need to create new Org", orgInfo)
            // TO DO WOLF
        }
    }
}

export const { base, user, userAdmin, site, org } = writer;
