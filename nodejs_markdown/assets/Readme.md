# [Qi_Markdown](http://the.jiaqi.org:3000/markdown)


## Usage:

1. Simply select and click the file to "Edit Below"

2. The edits are auto-saved

3. If you want a new file, "save as new" before editing

4. "Remove" will be alive soon~

## Developing Tools Used:

1. NodeJS:
I used NodeJS as the server host on a 3000 port to listen to all the requests. 

2. Express:
The middleware concept of Express is great, which makes it easier for creating the response process for all requests (GET, POST). The routing scheme is added for the markdown subpage.

3. Pug (Its old name is Jade):
It is a good way to develop a Webpage! Much easier than plain HTML. Don't need to consider the annoying "</>". The interpolation and simple variable pass (How Pug is rendered) from the server are easy.

4. Javascript (NodeJS use it by default):
Of course, Javascript is the core of the active webpage. The content change is all relying on it. In this project, it is used to submit the post request, to change the element in the page, etc.

5. Html and CSS:
The basic thing I knew long ago. But now I forgot some, so I spent some time picking it up.


## Project Folder Structure

./\
├── assets\
├── config\
├── htmls\
├── md_trash\
├── models\
├── node_modules\
│   ├── ...\
├── public\
│   ├── css\
│   ├── js\
│   ├── resources\
│   └── template\
├── routes\
├── serverjs\
└── views2\


## Knowledge points:

> GET requests do not have a "send()" function, which means it won't give content other than the requested link itself. 

> POST requests have a "send()" function, which can include the content you want to send, but need indicate the header. In this example, the header used is: xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
There are other headers, different headers define the ways you send the data.

## Others:

> 中文也可以的




