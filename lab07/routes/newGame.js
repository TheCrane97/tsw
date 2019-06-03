/* jshint esversion: 6, browser: true, devel: true */
'use strict';

exports.games = (newGame) => {
    return (_, res) => {
        res.render('newGame', {
            title: 'New Game',
            txt: newGame
        });
    };
};