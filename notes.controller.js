const fs = require('fs/promises')
const path = require('path')
const chalk  =require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString()
  }
  notes.push(note)
  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.bgGreen('note was added'))
}


async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding:'utf-8'})
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes(){
   const notes = await getNotes()
  console.log(chalk.bgBlue('list of notes:'))
  notes.forEach(note=>{
    console.log(chalk.blue('title:',note.title, '|','id:',note.id))
     })
}

async function removeNote(id){
  const notes = await getNotes()
  const newNotes = notes.filter(note=>note.id!==id)
  await fs.writeFile(notesPath, JSON.stringify(newNotes))
}

async function updateNote(noteData) {
  const notes = await getNotes()
  const index = notes.findIndex(note => note.id===noteData.id)
  if (index >= 0) {
    notes[index] = {...notes[index], ...noteData}
    await fs.writeFile(notesPath, JSON.stringify(notes))
  }
}

module.exports={
  addNote, printNotes, removeNote, getNotes, updateNote
}