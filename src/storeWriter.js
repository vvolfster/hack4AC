/* import this into your pages and call its functions to write. Make sure all functions herein return promises */


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
        acceptInvite(userId, compositeInviteId, profileInfo) {
            return writer.base.store.dispatch(`${this.name}/acceptInvite`, { userId, compositeInviteId, profileInfo })
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
