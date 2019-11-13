const router = require('express').Router();

router.get("/", (req, res) => {
    res.status(200).json("API running");
})

module.exports = router;