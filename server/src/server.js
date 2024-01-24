const {createServer } = require('http')
const {parse} = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
const dir = '/website_code'

const app = next({dev,hostname,port, dir})
const handle = app.getRequestHandler()

app.prepare().then(()=>{
    createServer(async (req,res) => {
	const parsedUrl = parse(req.url, true)
	const {pathname, query} =parsedUrl
	if (pathname === "/app"){
	    await app.render(req,res,"/app", query)
	}else if (pathname === "/mathlingo_api"){
	    console.log("api request")
	} else{
	    await handle(req,res,parsedUrl)
	    console.log("request to",pathname)
	}
    }).once(
	'error', (err)=>{
	    console.log("an error occurred")
	    process.exit(1)
	})
	.listen(port, ()=> {
	    console.log(`> Ready on http://${hostname}:${port}`)
	})
})
