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
    siteWriter: {
        name: "site",
        updateTransitCount(siteId, type, number){
            if(typeof number !== 'number')
                return Promise.reject()

            return writer.base.store.dispatch(`${this.name}/updateTransitCount`, { siteId, type, number })
        }
    }
}

export const { base, user, userAdmin, siteWriter } = writer;
