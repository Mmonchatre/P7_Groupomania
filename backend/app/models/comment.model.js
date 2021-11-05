module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
    comment: {
    type: Sequelize.STRING
    },
    post_id: {
    type: Sequelize.INTEGER
    },
    isVisible: {
    type: Sequelize.BOOLEAN
    }
    });
    return Comment;
    };
    