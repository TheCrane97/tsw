/* jshint strict: global, esversion: 6, devel: true */
'use strict';


let types=['number','number'];

let fun = function(a,b)
{
    return a+b;
}


let defFun = function(fun,types)
{
    fun.typeConstr = types;
    return fun;
}

const myfun = defFun(fun,types);

let appFun = function (myfun,arg) 
{

    if (myfun.typeConstr === 'undefined') 
    {
      throw({ typerr: "typeConstr is undefined" });
    }
    else
    {
        foreach(element in Array.from(arg))
        {
            if(typeof(element)!=myfun.typeConstr)   
                throw({typerr: "typeof(element) is not a" + myfun.typeConstr});
        }   

        return myfun.apply(this,arg);
   
    }
}



try {
    console.log(appFun(myfun, 12, 15));
} catch (e) {
    console.log(e.typerr);
}