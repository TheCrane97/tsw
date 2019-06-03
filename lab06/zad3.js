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
    let pom = 3;
    const main = (index) => {
        tab[index](pom, (e) => {
            pom = e;
            if (index === tab.length - 1) {
                cb(e);
            } else {
                main(index + 1);
            }
        });
    };
    main(0);
};

poKolei([fun1, fun2,fun1], cb);