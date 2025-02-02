const Comment = require('../components/comment/comment');

//create comment
const addComment = (req, res) => {
    const {type, id, comment} = req.body;
    console.log(type, id, comment);

    new Comment(res.locals.authData).addComment(type, id, comment).then((r) => {

        res.json({ success: true, result: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });

}

module.exports = {
    addComment,
}