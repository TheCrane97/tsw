function rand( min, max ){
  min = parseInt( min, 10 );
  max = parseInt( max, 10 );

  if ( min > max ){
      var tmp = min;
      min = max;
      max = tmp;
  }

  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}


class Game {
  
    constructor(id, size, colors, steps, solved, code ) {
      this.id = id;
      this.size = size;
      this.colors = colors;
      this.steps = steps;
      this.solved = solved;

      var i;
      code=[];
      for (i = 0; i < size; i++) { 
      code[i]=rand(0,colors);
      }
      console.log(code);
      this.code = code;
    }
  }

  module.exports = Game;