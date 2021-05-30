const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });

router.post("/rankings",  upload.single('rankingFile'), async (req, res) => {
    const name = req.query.name;
    console.log(req.file);
    fs.readFile(req.file.path, 'utf8', function(err, data){
        // Do something with the data (which holds the file information)
        console.log(data);
        res.end();
      });
    // });
    // try {    
    //   if (req.file) {
    //     res.send({
    //       status: true,
    //       message: "File Uploaded!",
    //     });
    //   } else {
    //     res.status(400).send({
    //       status: false,
    //       data: "File Not Found :(",
    //     });
    //   }
    // } catch (err) {
    //   res.status(500).send(err);
    // }
  });

  module.exports = router;