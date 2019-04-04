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


const razem = (fun1, fun2, cb) => {
    let wyniki = [];

    fun1(3, (wynik) => {
        wyniki.push(wynik);
        if(wyniki.length == 2) cb(wyniki);
    });

    fun2(3, (wynik) => {
        wyniki.push(wynik);
        if(wyniki.length == 2) cb(wyniki);
    });
 };

razem(fun1, fun2, cb);