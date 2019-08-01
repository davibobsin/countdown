var Timer = function(element,basetime = 10,title = "Titulo1") {
  this.title = title;
  this.running = false;
  this.basetime = basetime;
  this.timer = basetime;
  this.audio = new Audio('sounds/sound2.wav');
  this.frame = element;
  initElements();
  startTimer();
  update_text();

  //this.initElements = function(){
    function initElements(){
    var table = document.createElement("TABLE");
    table.classList.add("timer");

    var row_title = document.createElement("div");
    var row_content = document.createElement("div");
    row_content.classList.add("content");
    var row_buttons = document.createElement("div");

    this.frame.appendChild(row_title);
    this.frame.appendChild(row_content);
    this.frame.appendChild(row_buttons);
    //this.frame.appendChild(table);
    
    //var row = table.insertRow(0);
    //var row_title   = row.insertCell(0);
    //row.setAttribute("style","max-height:25px !important;background-color:blue;");
    //var row_content = table.insertRow(1).insertCell(0);
    //var row_buttons = table.insertRow(2).insertCell(0);

    //Adiciona Título
    var title = document.createElement("h1");
    title.innerHTML = "Título 1";
    title.setAttribute("contenteditable",true);
    title.setAttribute("spellcheck",false);
    row_title.appendChild(title);

    //Adiciona Relógio
    this.relogio = document.createElement("div");
    relogio.innerHTML = "--:--";
    relogio.id = "label";
    row_content.appendChild(relogio);

    //Adiciona botões
    var btn_names = ["+10", "Play","Pause","Stop"];
    var btn_class = ["time","play","pause","stop"];
    
    for (var i=0;i<btn_names.length;i++){
      var button = document.createElement("button");
      button.innerHTML = btn_names[i];
      button.classList.add(btn_class[i]);
      button.onclick = clicked;
      row_buttons.appendChild(button);
    }
    this.frame.getElementsByClassName("pause")[0].style.display = "none";
  }
  
  function clicked()
  {
    var command = event.target.classList[0];
    if(command =='time'){
      add(600);
    }
    else if(command =='play'){
      play();
    }
    else if(command =='pause'){
      pause();
    }
    else if(command =='stop'){
      pause();
      stop();
    }
  }
  
  function update_text(){
    var minutes,seconds;
    
    minutes = parseInt(this.timer / 60, 10)
    seconds = parseInt(this.timer % 60, 10);
  
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
  
    this.relogio.textContent = minutes + ":" + seconds;
  }
  
  function add(valor){
    this.timer = this.timer+valor;
    update_text();
    this.frame.style.backgroundColor = "black";
    //running = true;
  }
    
  function stop(){
    pause();
    this.timer = this.basetime;
    update_text();
    this.frame.style.backgroundColor = "black";
  }
  
  function play(){
    if (this.timer>0){
      this.running = true;
      this.frame.getElementsByClassName("pause")[0].style.display = "inline";
      this.frame.getElementsByClassName("play")[0].style.display = "none";
    }
  }

  function pause(){
    this.running = false;
    this.frame.getElementsByClassName("play")[0].style.display = "inline";
    this.frame.getElementsByClassName("pause")[0].style.display = "none";
  }
    
  function startTimer() {      
      setInterval(function () {
        if(this.running){
          --this.timer;
          if (this.timer == 0) {
              this.frame.style.backgroundColor = 'red';
              this.audio.play().catch(function() {});
              pause();
          } 
          update_text();
        }   
      }, 1000);
  }
}

window.onload = function () {
  Timer(document.body,600);
  // var phs = document.querySelectorAll(".placeholder");
  // for(var i=0;i<phs.length;i++){
  //   Timer(phs[i],10);
  // }
};