const userRoutes        = require("./userRoutes");
const paginasRoutes     = require("./paginasRoutes");

module.exports = app => {
    app.use("/user", userRoutes);
    app.use("/", paginasRoutes);
};