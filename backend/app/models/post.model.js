module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        content: {
            type: Sequelize.STRING
        },
        imageUrl: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        },
        isVisible: {
            type: Sequelize.BOOLEAN
        },
    });
    return Post;
};
    