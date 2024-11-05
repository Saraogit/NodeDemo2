const express = require("express")
const urlController = require("./../controllers/urlController")
const router = express.Router();

router.route("/")
.post(urlController.addNewUrl)
.get(urlController.getAllUrls)

router.route("/:id")
.get(urlController.getshortenUrl)
.delete(urlController.deleteById)
.patch(urlController.updateUrl);

module.exports = router;