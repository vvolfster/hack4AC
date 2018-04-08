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
        }
    },
    userAdmin: {
        name: "users",
        inviteUser(email) {
            return writer.base.store.dispatch(`${this.name}/inviteUser`, email)
        },
    },
    site: {

    }
}

export const { base, user, userAdmin, site } = writer;
