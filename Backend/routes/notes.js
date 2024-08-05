const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator"); //For validation purpose

//ROUTE 1: Get all the notes . Login Required
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internet Server Error");
  }
});



//Route 2: Add a New Note . Login required
router.post("/addnotes", fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atlest 5 characters").isLength({ min: 5, }),
  ], async (req, res) => {

    try {

      const { title, description, tag } = req.body;
      //if there are errrors, return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title, description, tag, user: req.user.id
      })
      const savedNote = await note.save()
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internet Server Error");
    }
  });


//ROUTE 3: Upadte note .(PUT) Login required

router.put("/upadtenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //Find the note to be upadted and update it 
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internet Server Error");
  }
})

//ROUTE 4: Delete note.(DELETE) Login required

router.delete("/delete/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    //Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //Find the note to be upadted and update it 
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id, { $set: newNote }, { new: true })
    res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {

    console.error(error.message);
    res.status(500).send("Internet Server Error");

  }
})
module.exports = router;
