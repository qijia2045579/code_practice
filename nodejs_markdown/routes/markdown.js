var express = require('express');

var router = express.Router();

// Load the file system
// var fs = require('fs')
var util = require('../serverjs/utils.js');

var utilInstance = new util();

var assettfolder = require('path').resolve(__dirname, '..')+'/assets/';

// console.log(assettfolder);


router.get('/', (req, res) => {
    var files_names = utilInstance.get_md_files(assettfolder)
    var file_title = "<File Title>"

    res.render('markdown', {
        md_files: files_names,
        file_title: file_title,
        mk_content: ""
    })
});

router.post('/update', (req, res) => {

    var mdfilename = req.body.mdfilename;
    var newmdcontent = req.body.mdcontent;
    var writefile = assettfolder+mdfilename;
    utilInstance.write_text_content(writefile, newmdcontent);
    var md_content = utilInstance.load_md_content(writefile)
    var context = {
        "md_content":md_content
    }
    res.send(context);
}
);

router.post('/passcode', (req, res) => {

    var passcode = req.body.passcode;
    // console.log("passcode"+passcode);
    var passed = false;
    if(passcode=='0925'){
        passed = true;
    }
    var context = {
        "passed":passed
    }
    res.send(context);
}
);

router.post('/save', (req, res) => {
    var oldmdname = req.body.oldmdname;
    // console.log(oldmdname);
    var newmdname = req.body.savemdname;
    // console.log(newmdname);
    var readfile = assettfolder+oldmdname;
    var writefile = assettfolder+newmdname;
    
    try {
        utilInstance.copy_md_file(readfile, writefile)
        // console.log('here');
        var context = {
            "new_file":newmdname
        }
        res.send(context);
    } catch (error) {
        var context = {
            "new_file":"wrong"
        }
        // console.log('there');
        res.send(context);
    }
    
    
    
}
);

router.post('/', (req, res) => {
    // console.log("I got a post request!")
    // console.log(req.body.textfile)
    var select_file=req.body.textfile
    var md_content = utilInstance.load_md_content(assettfolder+select_file)
    var text_content = utilInstance.load_text_content(assettfolder+select_file)
    var context = {
        "md_content":md_content,
        "text_content":text_content
    }

    res.send(context)

});

module.exports = router;


