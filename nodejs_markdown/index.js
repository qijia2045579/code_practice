// Simple Now
const express = require('express')
const app = express()

// node.js, "classic" way:
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
var result = md.render('[This is Markdown!](the.jiaqi.org:3000)');

// console.log(result)

// respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//   res.send(result)
// })

// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})


const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



