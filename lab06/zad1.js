/* jshint strict: global, esversion: 6, devel: true */
'use strict';

let fun1 = function(a,cb)
{
    return ()=> {
        setTimeout(()=>
        {
            cb(a*3);

        }, Math.random()*1000);
    };
}

let  fun2 = function(b,cb)
{
    return ()=>{
        setTimeout(()=>
        {
            cb(b+5)
        }, Math.random()*100);
    };
}


const poKolei = (fun1, fun2,cb) => {

    fun2(dane,(dane)=>{
        fun1(2,(dane)=>
        {
            return
        })
    })
    

};

