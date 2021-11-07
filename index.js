// Depedencies
const express = require('express'),
    app = express(),
    pug = require('pug'),
    fs = require('fs'),
    cookieParser = require('cookie-parser'),
    MongoClient = require('mongodb').MongoClient,
    // Database key
    uri = process.env.KEY,
    compile = (path, data) => pug.compileFile(path)({
        results: data
    }).replace(/<\|.+?\|>/g, x => merge(x))
// Embed js in html
merge = file => {
        let type = file[file.length - 4] == "s" ? ["style", "css"] : ["script", "js"]
        return `<${type[0]}>${fs.readFileSync(`static/${type[1]}/${file.slice(2,file.length-2)}`,"utf8")}</${type[0]}>`
    },
    // Connect to MongoDB
    initDatabase = async () => {
        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        return [client, client.db("Portfolio").collection("Posts")]
    }
    console.log(uri)
app.use(express.static('public'))
// Main
app.get('/', (_, res) => res.send(pug.renderFile('views/index.pug').replace(/<\|.+?\|>/g, x => merge(x))))

// Blog
app.get('/blog',cookieParser(),async (_, res) => {
    const [client, collection] = await initDatabase()
    const data = await collection.find({}).toArray()
    client.close()
    res.send(compile('views/blog.pug', data))
})

// Create posts
app.get("/create",(_, res) => res.send(pug.renderFile("views/create.pug").replace(/<\|.+?\|>/g, x => merge(x))))

// Publish posts
app.post("/",cookieParser(),express.json(),async (req, res) => {
    if (req.cookies.pwd == process.env.CODE) {
        const [client, collection] = await initDatabase()
        req.body.description = req.body.html.replace(/<.*?>/g, "").slice(0, 147) + "..."
        req.body._id = (Math.floor(Math.random()*9999999)).toString()
        await collection.insertOne(req.body)
        await client.close()
        res.send(true)
    } else
        res.send(false)
})

// View posts
app.get("/posts/:post", async (req, res) => {
    const [client, collection] = await initDatabase(),
        data = await collection.findOne({
            title: decodeURI(req.params.post)
        })
    client.close()
    res.send(compile('views/post.pug', data))
})
app.get("/pwd",(_,res)=>res.send(compile('views/pwd.pug', {})))
app.post("/pwd",cookieParser(),express.urlencoded({extended:true}),(req,res) => {
  res.cookie('pwd',req.body.pwd,{httpOnly: true, maxAge: Date.now() + 20000000000})
  res.send()
})
// 404
app.get("*", (_, res) => res.send(pug.renderFile('views/404.pug')))
app.listen(8080)