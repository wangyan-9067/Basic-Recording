const express = require('express')
const app = express()
const port = 3000
const RecordManager = require('./recordManager')
const bodyParser = require('body-parser')
const recordResult = require('./recordResult')

app.use(bodyParser.json());

app.post('/recorder/v1/start', (req, res, next) => {
    let { body } = req;
    let { appid, channel, key } = body;
    if (!appid) {
        throw new Error("appid is mandatory");
    }
    if (!channel) {
        throw new Error("channel is mandatory");
    }

    RecordManager.start(key, appid, channel).then(recorder => {
        //start recorder success
        res.status(200).json({
            success: true,
            sid: recorder.sid
        });
    }).catch((e) => {
        //start recorder failed
        next(e);
    });
})

app.post('/recorder/v1/stop', (req, res, next) => {
    let { body } = req;
    let { sid, filename } = body;
    if (!sid || !filename) {
        res.status(500).json({
            success: false,
            err: 'sid and filename are required.'
        });
    } else {
        RecordManager.stop(sid);
        recordResult.moveFile(sid, filename).then(function() {
            res.status(200).json({
                success: true
            });
        });

    }
})

app.use( (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        success: false,
        err: err.message || 'generic error'
    })
})

app.listen(port)