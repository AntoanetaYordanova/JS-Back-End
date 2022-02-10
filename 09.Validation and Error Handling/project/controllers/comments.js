module.exports = {
    async post(req, res) {
        const authorId = req.user._id;

        const cubeId = req.params.cubeId;
        const comment = {
            author: authorId,
            content: req.body.content
        };

        await req.storage.createComment(cubeId, comment);

        res.redirect(`/products/details/${cubeId}`);
    }
};