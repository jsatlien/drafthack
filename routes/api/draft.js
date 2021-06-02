const router = require('express').Router();
const db =  require('../../models');
require('dotenv').config();

//GET all drafts (optional filter by query string)
//external_id - external id of the draft (sleeper,yahoo,espn id)
//active
router.get('/', (req, res) => {
    const getActive = req.query.active;
    console.log(getActive);
    const externalId = req.query.external_id;
    console.log(process.env.TEST_USER_ID)
    //TODO: find a way to bind user id to drafts
    const constraint = {}// {user: process.env.TEST_USER_ID};
    if (getActive) {
        constraint.active = true;
    }
    else if (externalId) {
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
router.put('/pick/:external_id/:player_id', (req,res) => {
    console.log("pick!")
    const externalId = req.params.external_id;
    const playerId = req.params.player_id;

    //TODO add user to constraints
    db.Draft.updateOne(
        { external_id: externalId },
        {$push: { picked: playerId } } 
    )
    .then(dbUpdatedDraft => {
        req.app.io.emit('PICK_PLAYER', { externalId });
        res.json(dbUpdatedDraft);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.put('/activate/:external_id', (req,res) => {
    const externalId = req.params.external_id;
    console.log('activated!')
    //TODO add user to constraint
    db.Draft.updateMany({}, {active: false})
    .then( _ => {
        return db.Draft.updateOne(
            { external_id: externalId },
            { active: true } 
        )
    })
    .then(dbUpdatedDraft => {
        req.app.io.emit('DRAFT_LOBBY_OPEN', { externalId });
        res.json(dbUpdatedDraft);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.put('/deactivate/:external_id', (req,res) => {
    const externalId = req.params.external_id;
    //TODO add user to constraint
    db.Draft.updateOne({external_id: externalId}, {active: false})
    .then(dbUpdatedDraft => {
        res.json(dbUpdatedDraft);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});



module.exports = router;