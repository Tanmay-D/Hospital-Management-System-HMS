var express     = require("express"),
    router      = express.Router({mergeParams: true});
    

router.get("/", function(req, res) {
   res.render("report"); 
});


module.exports = router;