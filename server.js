const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(routes);

app.use(logger("dev"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
