


var txt_content = "";
var old_txt_content = txt_content;

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function checkCookie() {
    let inputpasscode = getCookie("passcode");
    var currentUrl = window.location.href;
    var needUrl = currentUrl.substring(0,currentUrl.length-8);
    var theUrl=needUrl+'markdown/passcode';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, false ); // false for synchronous request
    // This set request header must after the open() function, otherwise it won't parse the value.
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send("passcode="+inputpasscode);
    var restext = xmlHttp.responseText;
    obj = JSON.parse(restext);
    // alert(obj.passed);
    
    
    if (obj.passed == true) {
        return 
    } else {
        passcode = prompt("You may not enter correct passcode, please enter passcode:", "");
        document.body.innerHTML = "Please give correct passcode to use this site, you can refresh the page";
      if (passcode != "" && passcode != null) {
        setCookie("passcode", passcode, 7);
        window.location.reload();
      }
    }
  }

window.addEventListener('load', (event) => {
    checkCookie();
    // alert('The page has fully loaded');
});

function hideselection() {
    showselect = document.getElementById("selection").style.display;
    if(showselect=="none")
    {
        document.getElementById("selection").style.display = "block";
    }
    else
    {
        document.getElementById("selection").style.display = "none";
    }
}


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

function finddiff(str1, str2, threshold) {
    if (Math.abs(str1.length-str2.length)>=threshold) {
        return true;
    }
    else {
        let diff=0;
        try {
            for (var i = 0; i < str1.length; i++) {
                if ( str1.charAt(i)!=str2.charAt(i) )
                    diff += 1;
                if (diff>=threshold)
                    return true;
              }
        } catch (error) {
            return true;
        }
        return false;
    }
}

function updatemdfile_with_server(txt) {
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


function updatemdfile_without_server(txt) {
    var md = window.markdownit();
    var result = md.render('# markdown-it rulezz!');
    alert(result);
    // Will just call the stackedit-js 
    // var stackedit = new Stackedit();
    // alert(stackedit);
    // stackedit.openFile({
    //     name: 'Filename', // with an optional filename
    //     content: {
    //       text: txt // and the Markdown content.
    //     }
    //   });
    // stackedit.on('fileChange', (file) => {
    //     document.getElementById('md_div').value = file.content.text;
    // });
}


function textchange() {
    var txt_content = document.getElementById('editor').value;
    var diffthreshold = 1;
    if( finddiff(old_txt_content, txt_content, diffthreshold) ) {
        old_txt_content = txt_content;
        // alert('change larger than 3'); // if larger than 3, then we sync it to the content.
        updatemdfile_with_server(old_txt_content); 
        // Above will communicate with server to update the file on every change, a lot of communication cost.
        // updatemdfile_without_server(old_txt_content);
    }

}



