
var fs=require('fs');

class Utils {

    constructor() {
        var a=100;
    }

    /* This function will return the square of the number that the constructor of this class receives.*/

        
    get_md_files(assetpath) {
        var files_names = [];
        fs.readdirSync(assetpath).forEach(file => {
            //   console.log(file);
            files_names.push(file)
            });
        return files_names;
    }

    load_md_content(filename) {
        var file_content = fs.readFileSync(filename,
            {encoding:'utf8', flag:'r'});
        // Load the MarkdownIt
        var MarkdownIt = require('markdown-it'),
        md = new MarkdownIt();
        // var md_result = md.render('# markdown-it rulezz!');
        var md_result = md.render(file_content);
        // console.log(md_result)
        return md_result;

    }

    load_text_content(filename) {
        var file_content = fs.readFileSync(filename,
            {encoding:'utf8', flag:'r'});
        
        return file_content;

    }

    write_text_content(filename, content) {
        fs.writeFileSync(filename, content);
    }

    copy_md_file(oldname, newname) {
        fs.copyFileSync(oldname, newname);
    }

 }

 module.exports = Utils;
