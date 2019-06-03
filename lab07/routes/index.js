/* jshint esversion: 6, browser: true, devel: true */
'use strict';

exports.index = (par) => {
    return (_, res) => {
        res.render('index', {
            title: 'Express',
            txt: par
        });
    };
};