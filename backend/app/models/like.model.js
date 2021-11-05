module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {
        postId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        }
    });
    return Like;
};
    