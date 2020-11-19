import express = require('express');
const router: express.Router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ text: "ini dari typescript ruter lho" });
})

module.exports = router;