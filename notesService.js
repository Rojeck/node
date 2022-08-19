const {Note} = require('./models/note.js');

const createNote = (req,res,next) => {
    const {text} = req.body;
    const userId = req.user.userId;
    if (!text) {
        res.status(400).send({
            "message": "Error. Please provide some text" 
        })
    } else {
        const note = new Note({
            userId,
            text
        });
        note.save().then(() => {
            res.send({
                "message": "Success"
            })
        })
    }
}

const getNoteById = (req, res, next) => {
    const id = req.params.id;
    Note.findById({id: id, userId: req.user.userId}).then((note) => {
        res.json(note);
    }).catch((err) => {
        res.status(400).json({
            "message": "Did not find"
        })
    }) 
}

const checkNoteById = (req, res, next) => {
    const id = req.params.id;
    Note.findByIdAndUpdate({_id: id, userId: req.user.userId}, {$set: {completed: true}}).then(() => {
        res.json({"message":"Success"})
    }).catch(() => {
        res.status(400).json({
            "message": "Did not find"
        })
    })
}

const updateNoteById = (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    if (!text) {
        res.status(400).send({
            "message": "Error. Please provide text" 
        });
    } else {
        Note.findByIdAndUpdate({_id: id, userId: req.user.userId}, {$set: {text: text}}).then(() => {
            res.json({"message":"Success"})
        }).catch(() => {
            res.status(400).json({
                "message": "Did not find"
            })
        })
    }
}
 
const deleteNote = (req, res) => {
    const id = req.params.id;
    Note.findByIdAndDelete({_id: id, userId: req.user.userId}).then(() => {
        res.json({"message":"Success"})
    }).catch(() => {
        res.status(400).json({
            "message": "Did not find"
        })
    })
}

function getNotes (req, res, next) {
    Note.find().then(result => {
      if (req.query.offset || req.query.limit) {
        const startIndex = +req.query.offset - 1;
        const lastIndex = +req.query.limit + +startIndex;
        const resultObj = {
          "offset": req.query.offset,
          "limit": req.query.limit,
          "count": result.length,
          "notes": result.slice(startIndex, lastIndex)
        };
        return res.status(200).json(resultObj);
      } else {
        return res.status(200).json({
          "offset": 0,
          "limit": 0,
          "count": result.length,
          "notes": result
        });
      }
    });
  }

module.exports = {
    createNote,
    getNoteById,
    checkNoteById,
    updateNoteById,
    deleteNote,
    getNotes
}