
var txt_content = "";
var old_txt_content = txt_content;

function savemdfile() {
    
    var savemdname = document.getElementById('save_name').value;
    var oldmdname = document.getElementById('editor_title').textContent;
    // alert(oldmdname);

    if (savemdname=='Do not Duplicate!' || savemdname=="")
    {
        alert("Use correct file name for save~");
    } 
    else
    {
        var currentUrl = window.location.href;
        var needUrl = currentUrl.substring(0,currentUrl.length-8);
        var theUrl=needUrl+'markdown/save';
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", theUrl, false ); // false for synchronous request
        // This set request header must after the open() function, otherwise it won't parse the value.
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // alert(savemdname+"&"+oldmdname);
        xmlHttp.send("savemdname="+savemdname+"&oldmdname="+oldmdname);
        var restext = xmlHttp.responseText;
        if (restext=='wrong') {
            alert("Something Goes Wrong");
        } else {
            window.location.reload();
        }
    }

    
}

function readmdfile() {
    var e = document.getElementById('selector');
    var text = null;
    try {
        text = e.options[e.selectedIndex].text;
    } catch (error) {
        console.error(error);
    }
    
    if (text == null) {
        alert("Nothing selected");
    }
    else {
        // alert(text+" selected, send a POST to server, tell to use the selected file");
        var currentUrl = window.location.href;
        var needUrl = currentUrl.substring(0,currentUrl.length-8);
        var theUrl=needUrl+'markdown';
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", theUrl, false ); // false for synchronous request
        // This set request header must after the open() function, otherwise it won't parse the value.
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttp.send("textfile="+text);
        var restext = xmlHttp.responseText;
        obj = JSON.parse(restext);
        // alert(obj.md_content);
        document.getElementById("md_div").innerHTML = obj.md_content;
        document.getElementById("editor_title").innerHTML = text;
        document.getElementById("editor").value = obj.text_content;
        // return xmlHttp.responseText;
        // HttpRequest("http://10.0.0.163:3000/markdown", method="get", data="yourkey=yourdata");
    }
    
}

function finddiff(str1, str2) {
    if (Math.abs(str1.length-str2.length)>=1) {
        return true;
    }
    else {
        let diff=0;
        try {
            for (var i = 0; i < str1.length; i++) {
                if ( str1.charAt(i)!=str2.charAt(i) )
                    diff += 1;
                if (diff>=1)
                    return true;
              }
        } catch (error) {
            return true;
        }
        return false;
    }
}

function updatemdfile(txt) {
    filename=document.getElementById("editor_title").innerText;
    // alert(filename+" changed, updating the server side file");
    var currentUrl = window.location.href;
    var needUrl = currentUrl.substring(0,currentUrl.length-8);
    var theUrl=needUrl+'markdown/update';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send("mdcontent="+txt+"&mdfilename="+filename);
    var restext = xmlHttp.responseText;
    // alert(restext);
    obj = JSON.parse(restext);
    document.getElementById("md_div").innerHTML = obj.md_content;
}

function textchange() {
    txt_content = document.getElementById('editor').value;
    if( finddiff(old_txt_content, txt_content) ) {
        old_txt_content = txt_content;
        // alert('change larger than 3'); // if larger than 3, then we sync it to the content.
        updatemdfile(old_txt_content);
    }

}



