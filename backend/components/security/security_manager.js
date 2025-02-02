const jwt = require('jsonwebtoken');
const Persistence = require('../persistance/persistance');


class SecurityManager {

    constructor(authData) {
        const secret = "1f9d4341b4fe1e5f1a1e3c5a3a6d8c1e6f9b4e7d5c3b2a8f1e4d5f6b7c8a9d0f";
        this.secretKey = secret;
        this.authData = authData;
    }

    async authenticate(username, password) {
        try {
            if (!username || !password) {
                throw new Error('Invalid input');
            }

            const user = await Persistence.getRecord("user_accounts", {username: username, password: password});
            console.log("user account:", user);
            if (!user) {
                throw new Error('Invalid username or password');
            }

            //get user data
            const userData = await Persistence.getRecord("users", { id: user.user_id });
            userData.username = user.username;

            const payload = userData;
            console.log('payload:', payload);
            return { token: jwt.sign(payload, this.secretKey, { expiresIn: '24h' }), user: userData};

        } catch (error) {
            //console.error('Error:', error.message); // Handle the rejected promise
            throw new Error('Authentication failed');
        }
    }



    authenticateToken(token) {
        try {
            let t = token.split(" ")[1];
            return jwt.verify(t, this.secretKey);
        } catch (error) {
            console.log('authenticate token Error:', error.message);
            return false;
        }
    }

    async listRoles() {
        try {

            console.log("listRoles->Auth data", this.authData)
           
            let records = await Persistence.listRecords("roles", null);
            return records;

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }

    authorize(role, scope){
        try {
            if(this.authData.role != role){
                return false;
            }

            if(scope){
                console.log("check valid scope to do the action");
                if(this.authData.scope != scope){
                    return false;
                }
            }
            
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = SecurityManager;