const RewardsManager = require('../components/rewards/rewards_manager');

//create comment
const giveReward = (req, res) => {
    const {id, amount} = req.body;
    console.log(id, amount);

    new RewardsManager(res.locals.authData).giveReward(id, amount).then((r) => {

        res.json({ success: true, result: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });

}

module.exports = {
    giveReward,
}