// const yargs = require('yargs')
// const pkg = require('./package.json')
// const {addNote, printNotes, removeNote} = require('./notes.controller')
//
// yargs.version(pkg.version)
//
// yargs.command({
//   command: 'add',
//   describe: 'add new note to list',
//   builder: {
//     title: 'string',
//     describe: 'note title',
//     demandOption: true
//   },
//   handler({title}){
//     addNote(title)
//   }
// })
//
// yargs.command({
//   command: 'list',
//   describe: 'print all notes',
//   async handler(){
//     await printNotes()
//
//   }
// })
//
// yargs.command({
//   command: 'remove',
//   describe: 'remove note by id',
//   builder: {
//     id: {
//       type: 'string',
//       describe: 'note id',
//       demandOption: true
//     }
//   },
//   async handler({id}){
//     await removeNote(id)
//   }
// })
//
// yargs.parse()

const http = require('http')
const chalk =require('chalk')
const fs = require('fs/promises')
const path = require('path')
const {addNote, getNotes, removeNote} =require('./notes.controller')
const express = require('express')

const port = 3000
const basePath = path.join(__dirname, 'pages')
const app = express()

// const server = http.createServer(async (req, res)=>{
//   if (req.method === 'GET') {
//     const content = await fs.readFile(path.join(basePath, 'index.ejs'))
//     // res.setHeader('Content-Type', 'text/html')
//     res.writeHead(200, {
//       'Content-Type': 'text/html'
//     })
//     res.end(content)
//   } else if (req.method === 'POST') {
//     const body = []
//     res.writeHead(200, {
//       'Content-Type': 'text/plain; charset=utf-8'
//     })
//     req.on('data',data => {
//       body.push(Buffer.from(data))
//     })
//     req.on('end', () => {
//       const title = body.toString().split('=')[1].replaceAll('+', ' ')
//       addNote(title)
//     })
//     res.end('post success')
//   }
// })

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(express.urlencoded({
  extended: true
}))

app.get('/',  async (req, res) => {
  res.render('index', {
    title: 'express app',
    notes: await getNotes(),
    created: false
  })
})

app.post('/', async (req, res) => {
  await addNote(req.body.title)
  console.log(req.body)
  res.render('index', {
    title: 'express app',
    notes: await getNotes(),
    created: true
  })
})

app.delete('/:id', async (req, res)=>{
await removeNote(req.params.id)
  res.render('index', {
    title: 'express app',
    notes: await getNotes(),
    created: false
  })
})



app.listen(port, ()=>{
  console.log(chalk.green(`server on port ${port}...`))
})