// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 8080;
// I used the apache2 server to listen on the 2345\nodejs and forward it to the 8080 port
// The 8080 port is only open to local, so the outside is not maped, so, from the.jiaqi.org, it won't able to reach the 8080


// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World! Node.js is working correctly. \n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()



function sync_task_tracker() {
    console.log('Using an UGLY way to modify files and sync when request')
    
    
    try {
        const note1 = fs.readFileSync('./data/notes/note1.csv', 'utf8')
        // console.log(note1)
        var notes = note1.split(/\r\n|\r|\n/); // Splite by lines
        var notes_title = notes[0] // First line is title
        var notes_content = notes.slice(1, notes.length) // Rest are the content
        // console.log(notes_content)
    } catch (err) {
        console.error(err)
    }
    
    
    try {
      console.log("Try to modify the html file")
      const html_content = fs.readFileSync('./htmls/task_tracker.html', 'utf8')
      var pos = html_content.search("hide_anchor</p>") // The anchor preset in the html file
      var new_pos = pos+15
      var task_content = "<table>\n<tr>"
      var title_content = notes_title.split(',')
      for (let i = 0; i < title_content.length; i++) {
          task_content += "<th>"+title_content[i]+"</th>"
        }
      task_content += "</tr>\n<tr>"
      for (let i = 0; i < notes_content.length; i++) {
          var one_line = notes_content[i]
          var one_line_content = one_line.split(',')
          for (let j = 0; j < one_line_content.length; j++) {
              task_content += "<td>"+one_line_content[j]+"</td>"
            }
          task_content += "</tr>\n<tr>"
        }
      task_content += "</tr>\n</table>"
      var new_html_content = html_content.slice(0, new_pos) + task_content + html_content.slice(new_pos)
      fs.writeFileSync("./htmls/task_tracker_updated.html", new_html_content)
    } catch (err) {
      console.error(err)
    }
}



app.get('/', (req, res) => {
    // res.send('Hi! Coming through port 8080');
    sync_task_tracker()
    res.sendFile(path.join(__dirname, '/htmls/task_tracker_updated.html'))
  });


app.get('/submit', (req, res) => {
    console.log("Get the Submit button clicked!")
    // console.log(req.query)
    var new_line = "\n"+req.query.id+","+req.query.createdate+",\""+req.query.content+"\","+req.query.status
    fs.appendFileSync("./data/notes/note1.csv", new_line)
    res.sendFile(path.join(__dirname, '/htmls/task_tracker_updated.html'))
  });

app.listen(8080, () => console.log('Server ready'))




