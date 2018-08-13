var express = require('express');
var router = express.Router();



router.get('/',function(req,res,next){
  res.send('Server Alive')
})


module.exports = router;
