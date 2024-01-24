const {createServer } = require('http')
const {parse} = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
const dir = '/website_code'

const app = next({dev,hostname,port, dir})
const handle = app.getRequestHandler()

// checks if a string (usually a path) starts with a specific substring.
function startsWith(path, first){
    return path.slice(0,first.length) === first
}

app.prepare().then(()=>{
    createServer(async (req,res) => {
	const parsedUrl = parse(req.url, true)
	const {pathname, query} =parsedUrl
	if (startsWith(pathname,"/app")){
	    await app.render(req,res,pathname, query)
	}else if (startsWith(pathname,"/mathlingo-api")){
	    console.log("api request")
	} else{
	    await handle(req,res,parsedUrl)
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
