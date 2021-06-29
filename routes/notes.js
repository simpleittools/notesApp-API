const   express =   require('express'),
        router  =   express.Router(),
        Note   =   require("../models/note")


// Get all notes in /notes
router.get("/", async(req, res) => {
    try {
        const notes = await Note.find()
        res.json(notes)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

// GET specific note
router.get("/:id", getNote, (req, res) => {
    res.send(res.note)
})

// POST notes to database
router.post("/", async(req, res) => {
    const note = new Note({
        noteDetails: req.body.noteDetails,
        noteCreateDate: req.body.noteCreateDate,
        noteDueDate: req.body.noteDueDate
    })
    try {
        const newNote = await note.save()
        res.status(201).json(newNote)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//  Update the current item in the database
router.patch("/:id", getNote, async(req,res) => {
    if(req.body.noteDetails != null ){
        res.note.noteDetails = req.body.noteDetails
    }
    if(req.body.noteCreateDate != null ){
        res.note.noteCreateDate = req.body.noteCreateDate
    }
    if(req.body.noteDueDate != null ){
        res.note.noteDueDate = req.body.noteDueDate
    }

    try {
        await res.note.save()
        res.json({ message: `You have updated your note`})
    } catch (error) {
        res.status(400).json({ message: "Note not updated"})
    }
})

//  Delete items from the database
router.delete("/:id", getNote, async(req, res) => {
    try {
        await res.note.remove()
        res.json({ message: "Deleted Note" })
    } catch (error) {
        res.status(500).json({ message: "could not find note" })
    }
})


// Middleware = confirm note exists in the database, or let the user know it is not found
async function getNote(req, res, next) {
    let note
    try {
        note = await Note.findById(req.params.id)
        if(note == null){
            return res.status(404).json({ message: "Cannot find note."})
        }
    } catch (error) {
        return res.status(500).json({ message: "The ID selected was not found."})
    }
    res.note = note
    next()
}


module.exports = router