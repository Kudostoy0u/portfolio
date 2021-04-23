// Depedencies
const routel = require('./routel'),
	pug = require('pug'),
	fs = require('fs'),
	MongoClient = require('mongodb').MongoClient,
// Database key
	uri = process.env.KEY,
  compile = (path,data) => pug.compileFile(path)({
		results: data
	}).replace(/<\|.+?\|>/g, x => merge(x))
// Embed js in html
	merge = file => {
		let type = "script"
		if (file[file.length - 4] == "s") type = "style"
		return `<${type}>${fs.readFileSync("static/"+file.slice(2,file.length-2),"utf8")}</${type}>`
	},
// Connect to MongoDB
	initDatabase = async () => {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    return [client,client.db("Blog").collection("Posts")]
    }

routel.useMultiple(routel.static('views'),routel.json)

// Main
routel.get('/',pug.renderFile('views/index.pug').replace(/<\|.+?\|>/g, x => merge(x)))

// Blog
routel.get('/blog', async (_req, res) => {
  const [client,collection] = await initDatabase()
	const data = await collection.find({}).toArray()
	client.close()
	return compile('views/blog.pug',data)
})

// Create posts
routel.get("/create",pug.renderFile("views/create.pug").replace(/<\|.+?\|>/g, x => merge(x)))

// Publish posts
routel.post("/", async req => {
	let success = true
	if (req.body.pwd == process.env.CODE) {
		const [client,collection] = await initDatabase()
		delete req.body.pwd
		req.body.description = req.body.html.replace(/<.*?>/g, "").slice(0,147)+"..."
		await collection.insertOne(req.body)
    client.close()
	} else success = false
	return {success}
})

// View posts
routel.get("/posts/:post", async req => {
const [client,collection] = await initDatabase()
const data = await collection.findOne({title:decodeURI(req.params.post)})
client.close()
return compile('views/post.pug',data)
})

// 404
routel.fof(pug.renderFile('views/404.pug'))
routel.listen()