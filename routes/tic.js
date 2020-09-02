'use strict'

var express = require('express');
var router = express.Router();

var gridArray = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

var isFirstUser = true

var firstMarker = '0'
var altMarker = 'X'

var isWin = false

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    res.render('index', { 
        grid: gridArray, 
        isWin: isWin, 
        winner: isWin ? (isFirstUser ? firstMarker : altMarker) : ''
    });
}); 

router.get('/:x/:y', function(req, res, next) {

    if(isWin) {
       return 
    }

    if (isFirstUser) {
        gridArray[req.params.x][req.params.y] = firstMarker
    } else {
        gridArray[req.params.x][req.params.y] = altMarker
    }

    // winning condition
    // check row winning
    for(var x = 0; x < gridArray.length; x++) {
        
        let marker = ''
        if(isFirstUser) {
            marker = firstMarker
        } else {
            marker = altMarker
        }

        const row = gridArray[x].filter(element => element === marker)
        if(row.length == gridArray[x].length) {
            isWin = true
            break
        }
    }

    // TODO: check column winning
    // TODO: check diagonal winning

    if(!isWin) {
        isFirstUser = !isFirstUser
    }
    
    res.redirect('/tic')
});

router.get('/new', function(req, res, next) {
    
    gridArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]

    isFirstUser = true
    isWin = false

    res.redirect('/tic')
});

module.exports = router;
