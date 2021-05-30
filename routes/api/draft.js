const router = require('express').Router();
const db =  require('../../models');

//GET all drafts (optional filter by query string)
//external_id - external id of the draft (sleeper,yahoo,espn id)
router.get('/', (req, res) => {
    const externalId = req.query.external_id;
    const constraint = {};
    if ( externalId ) {
        constraint.external_id = externalId;
    }
    db.Draft.find(constraint)
    .then(dbDrafts => {
        res.json(dbDrafts);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

//GET draft by mongo id
router.get('/:id', (req, res) => {
    let draftId = req.params.id;
    db.Draft.findById(draftId)
    .then(dbDraft => {
        res.json(dbDraft);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

//POST a new draft
router.post('/', (req, res) => {
    console.log(req.body)
    db.Draft.create(req.body)
    .then(dbDraft => {
        res.json(dbDraft);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

//PUT add player to draft by external_id
router.put('/:external_id/:player_id', (req,res) => {
    const externalId = req.params.external_id;
    const playerId = req.params.player_id;
    db.Draft.updateOne(
        {external_id: externalId},
        {$push: { picked: playerId } } 
    )
    .then(dbUpdatedDraft => {
        req.app.io.emit('PICK_PLAYER');
        res.json(dbUpdatedDraft);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;