const router = require('express').Router();
// let Workout = require("../../models/workout");
let db = require("../../models");

//? pathing and adding file name

//create workout
router.post("/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

//update workout
router.put("/workouts/:id", (req, res) => {
    db.Workout.updateOne(
        { _id: req.params.id },
        { $push: { exercises: req.body } })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err);
        });
});

//get weeks workouts
router.get("/workouts/range", (req, res) => {
    db.Workout.aggregate([
        { $addFields: { totalDuration: { $sum: 
            '$exercises.duration', 
        }, }, },
    ]).sort({ _id: -1 }).limit(7)
        .then(data => {
            res.json(data)        })
                .catch(err => {
                    res.json(err);
                });

});
// get last workout
router.get("/workouts", (req, res) => {
    db.Workout.aggregate([
        { $addFields: { totalDuration: { $sum: 
            '$exercises.duration', 
        }, }, }]).then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });    //grabs last in api.js
});

module.exports = router;
