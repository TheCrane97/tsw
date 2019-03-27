/* jshint strict: global, esversion: 6, devel: true */
'use strict';

function defFun(fun,types)
{
    fun.typeConstr=types;
    return fun;
}


const myfun = defFun((a, b) => a + b, ['number','number']);
//console.log(myfun.typeConstr);

function appFun(f)
{
    if(f.typeConstr===undefined)
    {
        
        throw({typerr:"Brak typeConstr"});
        
    }
    else
    {
        let tab=Array.from(arguments).slice(1);
        
        tab.forEach((elem) => {
               
                if(!f.typeConstr.includes(typeof(elem)))
                {
                    throw({
                        typerr:{
                            "argument":elem,
                            "errorMessage": "argument ma zly typ",
                            "typeOfElem":typeof(elem)
                        }
                    });
                }
            
        });


        return f.apply(null,tab);
       
    }
}


try {
    console.log(appFun(myfun, 12, 15));
} catch (e) {
    console.log(e);
}