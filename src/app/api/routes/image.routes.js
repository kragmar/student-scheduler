const router = require("express").Router();
const imageModel = require("../models/image.model");
const imageController = require("../controllers/image.controller");

// Upload image
router.post("/", imageController.single("image"), (req, res, next) => {
  let obj = {
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
    studentId: req.body.studentId,
  };
  imageModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.redirect("/");
    }
  });
});

router.get("/", (req, res) => {
  imageModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.render("app", { items: items });
    }
  });
});

module.exports = router;
