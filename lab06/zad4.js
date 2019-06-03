/* jshint strict: global, esversion: 6, devel: true */
'use strict';

let fun1 = (a,cb) => 
{
    setTimeout(()=>{
        cb(a*3);
    }, Math.random()*1000);
}

let  fun2 = (b,cb) => 
{
    setTimeout(()=> {
        cb(b+5);
    }, Math.random()*100);
}

let cb = (x) => {
    console.log(x);
}


const poKolei = (tab,cb) => {
    let tablica = [];
    tab.forEach((element, index) => {
        element(index, (x) => {
            tablica.push(x)
            if (tablica.length === tab.length) {
                cb(tablica);
            }
        });
    });
};

poKolei([fun1, fun2,fun1], cb);