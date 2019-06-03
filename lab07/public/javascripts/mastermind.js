
document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    let colour;
    let size;
    let steps;
    let id;
    let startGame = document.getElementById('startGame');
    let setGame = document.getElementById('setGame');
    let game = document.getElementById('game');
    setGame.style.display = "none";
    game.style.display = "none";


    let button = document.getElementById('myButton');
    button.addEventListener('click', function () {
      startGame.style.display = "none";
      setGame.style.display = "block";
    });
  
    document.getElementById('send').addEventListener('click',async (e) =>{
      steps =document.getElementById('steps').value.trim();
      let colours =document.getElementById('colours').value.trim();
      size =document.getElementById('size').value.trim();
      let url = 'http://localhost:3000/game/new';


     await fetch(url, {
        method: 'POST', // or 'PUT'
        body:  JSON.stringify({size: size,colours: colours,steps: steps}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
 
      }).then(res => res.json())
      //.then(response =>console.log(response.game))
      .then(response => id = response.game) 
      .catch(error => console.error('Error:', error));
     // id = response.game;

      setGame.style.display = "none";
      game.style.display="block";
      for(let i= 0; i<size; i++)
      {
        let input = document.createElement('input');
        input.setAttribute("id", i);
        game.append(input);
      }
  });

  document.getElementById('move').addEventListener('click',async (e) =>{
    let url = 'http://localhost:3000/game/move';
    let move =[];
    for(let i= 0; i<size; i++)
    {
      move.push(parseInt(document.getElementById(i).value, 10));
    }
   await fetch(url, {
      method: 'POST', // or 'PUT'
      body:  JSON.stringify({game: id,move: move}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

    }).then(res => res.json())
    .then(response => colour = response) 
    .catch(error => console.error('Error:', error));
   // id = response.game;
    steps--;
    let remove = document.getElementById('black');
    if(steps == 0 || colour.result.black == size)
    {
      if(remove){
        remove.parentNode.removeChild(remove);
        }
      let end = document.createElement('p');
      end.innerHTML = "<div class=\"wynik\">Gra zakończona z wynikiem:" + "Black: " + colour.result.black + " White: " + colour.result.white+"</div>"
      game.append(end);
      let button = document.getElementById("move");
      button.disabled = true;
      //game.append(button);
    }
    else{
      
      if(remove){
      remove.parentNode.removeChild(remove);
      }
    let blacks = document.createElement('black');
    blacks.setAttribute("id", "black");
    blacks.innerHTML = "<div class=\"wynik\">Black:" + colour.result.black + "White:" + colour.result.white+"</div>"
    game.append(blacks);
    }

});
  } 



}
