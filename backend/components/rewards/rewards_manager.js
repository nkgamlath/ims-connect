const Persistence = require('../persistance/persistance');


const rewardObj = {
    id: 0,
    amount: 0.0,
    given_by: 0,
    given_at: 0,
    project_id: 0, //project id if it is a project comment
}

class RewardsManager {

    constructor(authData){
        this.authData = authData;
        this.table = "project_rewards";
    }

    //giveReward
    async giveReward(id, amount) {
        try {
            if (!id) {
                throw new Error('Invalid input');
            }

            //check project exists
            let project = await Persistence.getRecord("project", { id: id });
            if (!project) {
                throw new Error('Project not found');
            }

            //check user is authorized to give reward to project
            if(!this.securityManager.authorize(2, null)){
                throw new Error("User not authorized");
            }


            //check if user has already given reward to project
            let reward = await Persistence.getRecord(this.table, { project_id: id });
            if (reward) {
                throw new Error('User has already given reward to project');
            }

            let rewardObj = {
                amount: amount,
                given_by: this.authData.id,
                given_at: Date.now(),
                project_id: id,
                team_id: 0, // get project team id
            }

            let result = await Persistence.createRecord(this.table, rewardObj);
            return result;

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }
}

module.exports = RewardsManager;