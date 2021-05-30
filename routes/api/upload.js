const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });

router.post("/rankings",  upload.single('rankingFile'), async (req, res) => {
    const name = req.query.name;
    console.log(req.file);
    fs.readFile(req.file.path, 'utf8', function(err, data){
        if (err) {
            res.status(500).json(err);
        } else {   
            console.log(data);
            res.json({
                success: true,
                message: 'Upload Succesful!'
            });
        }
      });
  });

  router.post("/tiers",  upload.single('tiersFile'), async (req, res) => {
    const name = req.query.name;
    console.log(req.file);
    fs.readFile(req.file.path, 'utf8', function(err, data){
        if (err) {
            res.status(500).json(err);
        } else {   
            console.log(data);
            res.json({
                success: true,
                message: 'Upload Succesful!'
            });
        }
      });
  });


  module.exports = router;