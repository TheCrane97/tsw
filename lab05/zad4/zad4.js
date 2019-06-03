/* jshint strict: global, esversion: 6, devel: true */
'use strict';
const ocena = (kod) => {
    return (ruch) => {

        let wynik = {
            białe: 0,
            czarne: 0
        }

        let mapa1 = new Map();
        let mapa2 = new Map();

        kod.forEach((element, index) => {
            if (element === ruch[index]) {
                wynik.czarne++;
            } else {

                if (mapa1.get(element) === undefined) {
                    mapa1.set(element, 1);
                } else {
                    mapa1.set(element, mapa1.get(element) + 1);
                }

                if (mapa2.get(ruch[index]) === undefined) {
                    mapa2.set(ruch[index], 1);
                } else {
                    mapa2.set(ruch[index], mapa2.get(ruch[index]) + 1);
                }
            }

        });

        mapa1.forEach((value, key) => {
            let r = mapa2.get(key);
            if (r !== undefined) {
                r >= value ? wynik.białe += value : wynik.białe += r;
            }
        })
        return wynik;
    }

}

let kod = [1,2,3];
let ruch = [3,2,1];

console.log(ocena(kod)(ruch));
