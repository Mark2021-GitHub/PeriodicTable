let elements = [];
let n = 1;
let x = 10;
let y = 15;
let w = 35;
let h = 35;
let cLine1 = 0; // selected box's line color
let cLine0 = 255; // normal box's stroke

//화학계열: chemical series
let mseries = ['금속', 
              '금속',
              '금속',
              '금속',
              '금속',
              '금속',
              '준금속',
              '비금속',
              '비금속',
              '비금속',
              '금속',
              '금속'];
let eseries = ["Alkali metals", 
              'Alkaline earth metals',
              'Transition metals',
              'Post-transition metals',
              'Lanthanide',
              'Actinoid',
              'Metalloids',
              'Reactive nonmetals',
              'Halogen',
              'Noble gases',
              'Lanthanide',
              'Actinoid'];
let kseries = ["알칼리 금속", 
              '알칼리 토금속',
              '전이 금속',
              '전이후 금속',
              '란타넘족',
              '악티늄족',
              '준금속',
              '반응성 비금속',
              '할로젠',
              '비활성 기체',
              '란타넘족',
              '악티늄족'];
//Metal: 0-5 
let m_al = 0; //'Alkali metals';
let m_ae = 1; // 'Alkaline earth metals';
let m_tr = 2; // 'Transition metals';
let m_pt = 3; // 'Post-transition metals';
let m_la = 4; // 'Lanthanide';  
let m_ac = 5; // 'Actinoid'

// 'Metalloids': 반금속/준금속
let ml = 6; ;

// Nonmetal : 7-9 비금속
let nm_re = 7; // 'Reactive nonmetals' 반응성 비금속
let nm_ha = 8; // 'Halogen';
let nm_ng = 9; // 'Noble gases';

let label_la = 10; //'Label:Lanthanide';
let label_ac = 11; //'Label:Actinoid';
let m = 12;  // 금속 전체
let nm = 13; // 비금속 전체
let rep = 14; // 

var inputForm = document.querySelector("form");
var inputTxt = document.querySelector(".txt");
var playNextBtton = document.getElementById("playNext");
var radioMute = document.getElementById("mute");
var radioEn = document.getElementById("en");
var radioKo = document.getElementById("ko");
var radioKodesc = document.getElementById("koDesc");
var bSwitch = document.getElementById("check1");
var bLoop = document.getElementById("check2");
var dtText = document.getElementById("dt1");
var ddText = document.getElementById("dd1");

// for speechSynthesis;
var synth = window.speechSynthesis;
var voices = [];
var selVoice = document.getElementById("voice");
var rangeRate = document.getElementById("rate");
let voiceSelect;
let pitchSlider;
let rateSlider;
let enVoice = [];
let kVoice = [];
let bVoice = false;
let next = 1 ;



class csBox {
  constructor(bx, by, bw, bh, name, ptclass,fsize, desc) {
    this.x = bx;
    this.y = by;
    this.w = bw;
    this.h = bh;
    this.name = name;
    this.fillc = fc(ptclass);
    this.ptclass = ptclass;
    this.fsize = fsize;
    this.desc = desc;
  }
  show(bLine) {
      if( bLine == true){
        stroke(0); 
      } else {
        stroke(255);
      } 
      fill(this.fillc);
      rect(this.x, this.y, this.w, this.h);
      fill(255);
      textSize(this.fsize);
      stroke(0);
      textAlign(CENTER,CENTER);
      text(this.name, this.x+this.w/2, this.y+this.h/2);
  }
  showV(bLine) {
      if( bLine == true){
        stroke(0); 
      } else {
        stroke(255);
      } 
      fill(this.fillc);
      rect(this.x, this.y, this.w, this.h);
      fill(255);
      textSize(this.fsize);
      stroke(0);
      textAlign(LEFT,TOP);
      textWrap(CHAR);
      text(this.name, this.x+2, this.y+2, this.w);
  }
  contains(mx, my) {
    if (
      this.x < mx &&
      mx < this.x + this.w &&
      this.y < my &&
      my < this.y + this.h
    ) {
      return true;
    } else {
      return false;
    }
  }
}

var csbox = []; //chemical series box
var repbox ; // 전형원소(representative element) box
function setupCSBox() {
  let l = 14*w;
  let t = 60;
  let vy = t+23;
  let vw = 18;
  let vh = 105;
  let vs = vw+3;
  let font1 = 15;
  let font2 = 14;
  csbox[0] = new csBox(l, t, vs*6-3, 20, "금속", m, font1, "[Metals]");
  csbox[1] = new csBox(l+vs*7, t, vs*3, 20, "비금속", nm, font1,"[Nonmetals]");
  csbox[2] = new csBox(l+vs*6, t, vw, vh-30, "준금속", ml,font2, "[Metalloids]");
    csbox[3] = new csBox(l, vy, vw, vh, "알칼리 금속", m_al,font2, ": 물과 반응해 염기성 용액을 만드는 높은 반응성을 가진 금속");
  csbox[4] = new csBox(l+vs, vy, vw, vh, "알칼리 토금속", m_ae, font2, "존재량이 풍부해 다양한 분야에서 활용되는 높은 반응성의 금속");
   csbox[5] = new csBox(l+vs*4, vy+20, vw, vh-20, "전이 금속", m_tr,font2, "[Metals - Transition metals]"); 
  csbox[6] = new csBox(l+vs*5, vy, vw, vh, "전이후 금속", m_pt,font2, "[Metals - Post-transition metals]");
  csbox[7] = new csBox(l+vs*2, vy+30, vw, vh-30, "란타넘족", m_la,font2, "[Metals - Lanthanide]"); 
  csbox[8] = new csBox(l+vs*3, vy+30, vw, vh-30, "악티늄족", m_ac,font2, "[Metals - Actinoid]");
  csbox[9] = new csBox(l+vs*7, vy, vw, vh, "반응성 비금속", nm_re,font2, "[Nonmetals - Reactive nonmetals]");
  csbox[10] = new csBox(l+vs*8, vy, vw, vh, "할로젠", nm_ha,font2, "Group 17: Halogen - 1가 음이온이 되는 원소들로 1족 원소(1가 양이온)들과 격렬하게 반응하여 염을 생성");
   csbox[11] = new csBox(l+vs*9, vy, vw, vh, "비활성 기체", nm_ng,font2, "Group 18: Noble gas - 불활성 기체라고도 하는 18족 원소들은 최외각 전자껍질이 완전히 채워져 있어 반응성이 매우 낮고, 상온에서 모두 기체 상태로 존재, 물질의 보호에 널리 사용");
  
  repbox = new csBox(l, t-30, vs*10, 20, "전형원소", rep,font1, "[Representative element]");

  
}  

var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = dtText.offsetTop +100  ;
  cnv.position(x, y);
}
function windowResized() {
  centerCanvas();
}

function setup() {
  cnv = createCanvas(800, 580);
  centerCanvas();
  
  setupVoicesSelect();
  setupElement();
  setupCSBox();
    
}


function draw() {
  background(220);
  
  showLabel() ;  // Period, Group Label
  for (let i = 1; i < n; i++) {
   
    if( elements[i].contains(mouseX, mouseY) ){
      dtText.innerText = elements[i].str;
      ddText.innerText = elements[i].desc;
      showAtom(elements[i].id, elements[i].shell);
      showBox(i);
      elements[i].show(true);
    } else {
      elements[i].show(false);
    }
  }
  
  showSeries(); 
  
  // 금속 / 비금속 가로 상자 표지
  for(let i=0; i < 2; i++){
    if(csbox[i].contains(mouseX, mouseY)) {
       csbox[i].show(true);
       dtText.innerText = csbox[i].name;
       ddText.innerText = csbox[i].desc;
    } else {
       csbox[i].show(false);
    }  
  }
  // 세부 화학계열 세로 상자 표시
  for(let i=2; i < 12; i++){
    if(csbox[i].contains(mouseX, mouseY)) {
       csbox[i].showV(true);
       dtText.innerText = csbox[i].name;
       ddText.innerText = csbox[i].desc;
    } else {
       csbox[i].showV(false);
    }  
  }
  // 전형원소 상자 표시
  
    if(repbox.contains(mouseX, mouseY)) {
      repbox.show(true);
      dtText.innerText = repbox.name;
      ddText.innerText = repbox.desc;
    }else {
      repbox.show(false);
    }
  
  
  
  if(bLoop.checked == false){ 
    showAtom(elements[next].id, elements[next].shell);
    showBox(next); 
    noLoop();
  }    
}

function showSeries() {
  
  for (let i=1;i <n; i++) {
    if(repbox.contains(mouseX,mouseY)){
      // 전형 원소 표시, Period 1,2, 13~18
      if(elements[i].px <= 2 || 
         elements[i].px >= 13) {
        elements[i].show(true);
      }
    } else if(csbox[0].contains(mouseX, mouseY)) { 
      // 금속 원소, ptclass: 0~5, 10~
      if(elements[i].ptclass < 6 || 
         elements[i].ptclass > 9) {
        elements[i].show(true);
      }
    } else if(csbox[1].contains(mouseX, mouseY)) { 
      // 비금속
      if( 7 <= elements[i].ptclass &&  elements[i].ptclass <= 9 ) {
        elements[i].show(true);
      }
    } else {
      for(let j=2; j<12; j++) {
        if(csbox[j].contains(mouseX, mouseY)) { 
        // 
          if(elements[i].ptclass == csbox[j].ptclass) {
            elements[i].show(true);
          }
          // 란타넘족 박스 표시
          if(csbox[j].ptclass == m_la && elements[i].ptclass== label_la) {
            elements[i].show(true);
          }
          // 악티늄족 박스 표시
          if(csbox[j].ptclass == m_ac && elements[i].ptclass== label_ac) {
            elements[i].show(true);
          }
        }  
      }        
    } 
  }
}


bLoop.onclick = function (){
  if(bLoop.checked == true){
    loop();
  }
}

let tableTop = 6*h;
let tableBot = tableTop + h*7+20;


function showLabel() {
  strokeWeight(1);
  stroke(255);
  textStyle(NORMAL);
  textAlign(LEFT,BASELINE);
  
  
  // 1-7 Period Label
  textSize(10);
  fill(0);
  text("Period",w,tableTop-12);
  text("▼",w,tableTop);
  textSize(15);
  for( let p=1; p<=7; p ++) {
      text(p,w,tableTop + p*h-5 );
  }
  
  // 1-18 Group Label
  textSize(10);
  fill(0);
  text("Group ▶︎",w,tableBot-2)
  textSize(15);
  for( let g=1; g <=18; g ++) {
      text(g,g*w+5+w, tableBot );
  }
  
  // 란타넘족
  textSize(13);
  fill(0);
  text("란타넘족 ▶︎", w*3, tableBot+30);
  text("[57-71]", w*3, tableBot+45);
  text("악티늄족 ▶︎", w*3, tableBot+65);
  text("[89-103]", w*3, tableBot+80);
  
  
  
  
}

class Element {
  constructor(id, s, ename, kname, px, py, ptclass, shell, desc) {
    this.id = id;
    this.s = s;
  
    this.ename = ename;
    this.kname = kname;
    this.px = px; // px(1-18) PT:가로(1족~18족)
    this.py = py; // py(1-7 ) PT:세로(1주기 ~ 7 주기)
    this.w = w;
    this.h = h;
    this.desc = desc;
    this.ptclass = ptclass;
    this.fillc = fc(this.ptclass);
    this.linec = 255;
    this.tsize = 15;
    this.str=" "+this.id +" ["+this.s +"] "+this.ename+" ("+this.kname+")";
    
    this.x = (this.px-1)*this.w+2*w;   
    this.y = (this.py-1)*this.h+tableTop; 
      
    if(ptclass == m_la){
      this.x += (this.id - 56) * this.w;   
      this.y += this.h*3; 
    } else if(ptclass == m_ac){
      this.x += (this.id - 88) * this.w;   
      this.y += this.h*3; 
    } 
    
    this.shell = shell;
    
  }
  
  show(bLine) {
     if (bLine == true) { 
        this.linec = cLine1;
        strokeWeight(2);
      } else {
        this.linec = cLine0;
        strokeWeight(1);
      }
     
      stroke(this.linec)
      fill(this.fillc);
      rect(this.x, this.y, this.w, this.h);
      stroke(0);
      strokeWeight(1);
      textAlign(LEFT,BASELINE);
      textSize(13);
      fill(255);
      text(this.id,this.x+5,this.y + 12);
      textSize(15); 
      text(this.s,this.x+5,this.y + 30);
  
  }

  contains(mx, my) {
    if (
      this.x < mx &&
      mx < this.x + this.w &&
      this.y < my &&
      my < this.y + this.h
    ) {
      return true;
    } else {
      return false;
    }
  }
  
  speech(lang, vid){
    if(lang == 'ko-KR'){
      textToSpeech(this.kname, vid); 
    } else {
      textToSpeech(this.ename, vid);  
    }
  }
  
}


// elements' detail box
let l = w*3+10;
let t = h;
let bw = 4*w;
let bh = 5*h-20;
let r = l+bw;
let b = t + bh;

function showBox(id) {
  fill(elements[id].fillc);
  stroke(0);
  rect(l,t,bw,bh);
  fill (255);
  textSize(15);
  textAlign(LEFT, BASELINE);
  for(let s=0; s<7; s++) {
    let e = elements[id].shell[s]; 
    if( e == 0 ) {
      break;
    } 
    let ch = char(75+s); // 'K' - 75
    text(ch,r-40, t+(s+1)*h/2);
    text(e,r-20, t+(s+1)*h/2);
  }
  textSize(20);
  text(elements[id].id,l+5, t+20);
  textSize(30);
  textStyle(BOLD);
  text(elements[id].s,l+5, t+50); //원소기호
  textSize(13);
  textStyle(NORMAL);
  textWrap(WORD); 
  text(elements[id].kname,l+5, b-85); //한글 원소명
  textSize(13);
  text(elements[id].ename,l+5, b-80,95);//영어 원소명
  
  textSize(13);
  text("["+ mseries[elements[id].ptclass] +"]",l+5, b-35);
  textSize(13);
  text(kseries[elements[id].ptclass],l+5, b-20);
  text(eseries[elements[id].ptclass],l+5, b-5);
  
}

let atomx = 10*w+20;
let atomy = 3*h+10;

function showAtom(id,shell){
  push();
  translate(atomx,atomy);
  fill(255);
  noStroke();
  circle(0,0,180); // atom's background
  
  fill(125);
  circle(0,0,25); // proton, neutron
  textSize(10);
  fill(255);
  textAlign(CENTER, CENTER);
  text("+"+id,0,0);  // atom number
  for(let s=0; s<7; s++) { // shell number = s+1;
      let e = shell[s]; 
      if( e > 0 ) { // e = number of electrons
        noFill();
        stroke(100);
        let orbit = (s+2)*20; // orbit diameter;
        circle(0,0, orbit); // show shell orbit
        
        let angle = TWO_PI/e;
        let theta = 0;
        let r = orbit/2;
        let ex = r*cos(0);
        let ey = r*sin(0);
        for(let ei=0; ei<e; ei++){
          push();
          ex = r*cos(theta);
          ey = r*sin(theta);
          translate(ex, ey);
          // if this is outermost shell
          if( shell[s+1] ==0 || s == 6) {
           fill(255,255,0);   
          } else {
           fill(0);  
          }
          
          circle(0,0,5);
          pop();
          theta += angle;
        }
        
      }
  }
  pop();
       
}

function fc(ptclass) 
{
  if( ptclass == m_al) {
    return color(255,0,0); 
  } else if( ptclass == m_ae){
    return color(255,100,0);
  } else if( ptclass == m_tr){
    return color(120,0,0);
  } else if( ptclass == m_pt){
    return color(200,150,0);
  } else if( ptclass == m_la || ptclass == label_la){
    return color(150,100,100);
  } else if( ptclass == m_ac || ptclass == label_ac){
    return color(120,100,100);
  } else if( ptclass == ml){ 
    return color(0,150,200);
  } else if( ptclass == nm_re){
    return color(0,200,0);
  } else if( ptclass == nm_ha){
    return color(0,150,0);
  } else if( ptclass == nm_ng){
    return color(0,100,0);
  } else if( ptclass == m){
    return color(100,0,0);
  } else if( ptclass == nm){
    return color(0,50,0);
  } else if( ptclass == rep){
    return color(150,150,150);
  }
  return color(50,50,50);
}






playNextBtton.onclick = function (){
  playNext();
}

let isNext = false;

function playNext(){
  if(synth.speaking) {
   return;
  }
  
  let sel = selVoice.value;
  let str = splitTokens(sel, ':');
  let vnumber = Number(str[0]);
  
  dtText.innerText =  elements[next].str;
  ddText.innerText = elements[next].desc;
  
  showAtom(elements[next].id, elements[next].shell );
  showBox(next);
  redraw();
  elements[next].show(true);
  
  
   if(bSwitch.checked == true){
       if(isNext == false ){
         inputTxt.value = elements[next].ename;
         //elements[next].speech(voices[vnumber].lang, vnumber);
         textToSpeech(elements[next].ename, vnumber);
         isNext = true;
       } else {
         inputTxt.value = elements[next].kname;
         textToSpeech(elements[next].kname, kVoice[0]);
         next ++;
         if(next == n) next = 1;  
         isNext = false;
       }
   } else {
     if(radioEn.checked == true){
       inputTxt.value = elements[next].ename;
       elements[next].speech(voices[vnumber].lang, vnumber);  
     } else if(radioKo.checked == true ){
        inputTxt.value = elements[next].kname; 
       textToSpeech(elements[next].kname, kVoice[0]);
     } else if(radioKodesc.checked == true ){ 
        inputTxt.value = elements[next].kname; 
        textToSpeech(elements[next].kname + " "+elements[next].desc, kVoice[0]);
       
     }
     next ++;
     if(next == 119) next = 1;  
   }
   
}

selVoice.onchange = function (){
  if(synth.speaking) {
    return;
  }
  
  let sel = selVoice.value;
  let str = splitTokens(sel, ':');
  let vnumber = Number(str[0]);  
  
  if(radioEn.checked == true){
    textToSpeech(inputTxt.value, vnumber);
  } else {
    textToSpeech(inputTxt.value, kVoice[0]);
  }
  
}
inputForm.onsubmit = function (event) {
  event.preventDefault();
  if(synth.speaking) {
    return;
  }
  
  let sel = selVoice.value;
  let str = splitTokens(sel, ':');
  let vnumber = Number(str[0]);  
  
  if(radioEn.checked == true){
    textToSpeech(inputTxt.value, vnumber);
  } else {
    textToSpeech(inputTxt.value, kVoice[0]);
  }
  
};


function textToSpeech(txt,vid) {
  if (synth.speaking) {
    return;
  }
  if (txt !== "") {
    var ut = new SpeechSynthesisUtterance(txt);
   
    ut.voice = voices[vid];
    ut.pitch = 1;
    ut.rate = float(rangeRate.value); 
    synth.speak(ut);
  }
}

function setupVoicesSelect(){
  let voicestr;
  let e=0;
  let k=0;
  let isDefault = false;
  let defaultVoice;
  
  voices = synth.getVoices();
  for(var i = 0; i < voices.length; i++) {
    let str = i+":" + voices[i].name + "("+ voices[i].lang+")";
    
    let lang = split(voices[i].lang, '-');
    if(lang[0] == "en") {
     
      var option = document.createElement("option");
      option.text = str;
      selVoice.add(option);

      enVoice[e] = i;
      e ++;
      if(isDefault == false){
        defaultVoice = i;
        isDefault = true;
      }
    } else if( lang[0] == "ko"){
      kVoice[k] = i;
      k++;
      
      var option = document.createElement("option");
      option.text = str;
      selVoice.add(option);
      
    }
  }  
  
  selVoice.selectedIndex = defaultVoice;
  rangeRate.defaultValue = 0.8;

}

function mousePressed() {
  let sel = selVoice.value;
  let str = splitTokens(sel, ':');
  let vnumber = Number(str[0]);
 
  
  for (let i = 1; i < n; i++) {
    if (elements[i].contains(mouseX, mouseY)) {
      next = i;
      dtText.innerText = elements[next].str;
      ddText.innerText = elements[next].desc;
      showAtom(elements[next].id, elements[next].shell);
      showBox(next);
      redraw();
      elements[next].show(true);
      
      if(radioMute.checked == true){
        break;
      }
      if(bSwitch.checked == true){
        inputTxt.value = elements[i].ename;
        if( bVoice == false) {
          textToSpeech(elements[i].ename, vnumber);
          bVoice = true;
        } else if(bVoice == true) {
          textToSpeech(elements[i].kname, kVoice[0]);
          bVoice = false;
        }
      } else {
           if(radioEn.checked == true){
              inputTxt.value = elements[i].ename;
              textToSpeech(elements[i].ename, vnumber);
            } else if(radioKo.checked == true ) {
              inputTxt.value = elements[i].kname;
              textToSpeech(elements[i].kname, kVoice[0]);
            }  else if(radioKodesc.checked == true ){ 
               inputTxt.value = elements[i].kname; 
               textToSpeech(elements[i].kname + " "+elements[i].desc, kVoice[0]);
       
             }
        
      }
      
    }
  }

  if(repbox.contains(mouseX, mouseY)) {
    if(radioMute.checked == false){
      textToSpeech(repbox.name, kVoice[0]);
    }
  }  
  
  for(let i=0; i < 2; i++){
    if(csbox[i].contains(mouseX, mouseY)) {
      if(radioMute.checked == false){
         textToSpeech(csbox[i].name, kVoice[0]);
      }  
    }  
  }
  for(let i=2; i < 12; i++){
    if(csbox[i].contains(mouseX, mouseY)) {
       if(radioMute.checked == false){
        textToSpeech(csbox[i].name, kVoice[0]);
       }
    }  
  }
  redraw();
}

function setupElement() {
  elements[1] = new Element(1, "H", "Hydrogen", "수소", 1, 1, nm_re, [1,0,0,0,0,0,0], ": 가장 가볍고 불에 타기 쉬운 기체");
  n++;
  elements[2] = new Element(2, "He", "Helium", "헬륨", 18, 1, nm_ng, [2,0,0,0,0,0,0], ": 풍선을 뜨게하는 가벼운 기체");
  n++;
  elements[3] = new Element(3, "Li", "Lithium", "리튬", 1, 2,  m_al, [2,1,0,0,0,0,0], ": 대용량, 고효율의 리튬이온 전지에 사용되는 가장 가벼운 금속");
  n++;
  elements[4] = new Element(4, "Be", "Beryllium", 
                            "베릴륨", 2, 2, m_ae, [2,2,0,0,0,0,0], ": 알루미늄보다 가볍고 강철보다 단단한 금속");
  n++;
  elements[5] = new Element(5, "B", "Boron", "붕소", 13, 2, ml, [2,3,0,0,0,0,0], ": 불에 타기 어려워 내열유리, 로켓 엔진 노즐등에 사용되는 반금속");
  n++;
  elements[6] = new Element(6, "C", "Carbon", "탄소", 14, 2, nm_re,[2,4,0,0,0,0,0], ": 다이아몬드, 연필심, 유기화합물을 이루는 생명의 원소");
  n++;
  elements[7] = new Element(7, "N", "Nitrogen", "질소", 15, 2,nm_re, [2,5,0,0,0,0,0], ": 공기의 78%를 차지하는 기체");
  n++;
  elements[8] = new Element(8, "O", "Oxygen", "산소", 16, 2,nm_re, [2,6,0,0,0,0,0],": 물질을 연소시키거나 산화시키는 기체");
  n++;
  elements[9] = new Element(9, "F", "Fluorine","플루오린 / 불소",17,2,nm_ha, [2,7,0,0,0,0,0], ": 조리 기구의 코팅제나 치약에 사용되는 반응성이 높은 기체");
  n++;
  elements[10] = new Element(10, "Ne", "Neon", "네온", 18, 2,nm_ng, [2,8,0,0,0,0,0], ": 전압을 가하면 붉게 빛나는 기체");
  n++;
  elements[11] = new Element(11,"Na","Sodium (Natrium)","소듐 / 나트륨",1,3, m_al, [2,8,1,0,0,0,0], ": 바닷물 속 소금에 풍부하게 존재하는 무른 금속");
  n++;
  elements[12] = new Element(12,"Mg","Magnesium","마그네슘",2,3, m_ae, [2,8,2,0,0,0,0], ": 쉽게 불에 타면서 밝은 백색광을 내고, 경량,고강도의 첨단 합금 소재 금속");
  n++;
  elements[13] = new Element(13,"Al","Aluminium","알루미늄",13,3, m_pt, [2,8,3,0,0,0,0], ": 가볍고, 열 전도성이 좋아 다양한 합금 소재로 산업에서 널리 활용되는 금속");
  n++;
  elements[14] = new Element(14,"Si","Silicon","규소 / 실리콘",14,3, ml, [2,8,4,0,0,0,0], ": 지각에 산소 다음으로 풍부하게 존재하는 가장 저렴한 반도체");
  n++;
  elements[15] = new Element(15, "P", "Phosphorus", "인", 15, 3, nm_re, [2,8,5,0,0,0,0], ": 소변에서 추출되는 생체 화합물의 필수 원소인 비금속");
  n++;
  elements[16] = new Element(16, "S", "Sulfur", "황", 16, 3, nm_re, [2,8,6,0,0,0,0], ": 화산지대에서 직접 채굴 되는 노란색 비금속"); 
  n++;
  elements[17] = new Element(17, "Cl", "Chlorine", "염소", 17, 3, nm_ha, [2,8,7,0,0,0,0], ": 자극적인 냄새가 있는 황록색 기체");
  n++;
  elements[18] = new Element(18, "Ar", "Argon", "아르곤", 18, 3, nm_ng, [2,8,8,0,0,0,0], ": 반응성이 거의 없는 게으른 기체");
  n++;
  elements[19] = new Element(19, "K","Potassium (Kalium)","포타슘 / 칼륨",1,4, m_al, [2,8,8,1,0,0,0],": 비료의 3대 요소중 하나로 물과 격렬하게 반응하는 무른 금속");
  n++;
  elements[20] = new Element(20, "Ca", "Calcium", "칼슘", 2, 4, m_ae, [2,8,8,2,0,0,0], ": 뼈와 치아의 주성분이 되는 금속");
  n++;
  elements[21] = new Element(21, "Sc", "Scandium", "스칸듐", 3, 4, m_tr, [2,8,9,2,0,0,0], ": 멘델레예프가 예언한 원소로 태양처럼 밝은 빛을 내는 희소 금속(전이 금속)");
  n++;
  elements[22] = new Element(22, "Ti", "Titanium", "타이타늄", 4, 4, m_tr, [2,8,10,2,0,0,0], ": 금속(전이 금속)");
  n++;
  elements[23] = new Element(23, "V", "Vanadium", "바나듐", 5, 4, m_tr, [2,8,11,2,0,0,0], ": 금속(전이 금속)");
  n++;
  elements[24] = new Element(24, "Cr", "Chromium", "크로뮴", 6, 4, m_tr, [2,8,13,1,0,0,0], ": 금속(전이 금속)");
  n++;
  elements[25] = new Element(25,"Mn","Manganese","망가니즈 / 망간", 7, 4, m_tr, [2,8,13,2,0,0,0], ": 금속(전이 금속)");
  n++;
  elements[26] = new Element(26, "Fe", "Iron (Ferrum)", "철", 8, 4, m_tr, [2,8,14,2,0,0,0],": ");
  n++;
 elements[27] = new Element(27, "Co", "Cobalt", "코발트", 9, 4, m_tr, [2,8,15,2,0,0,0], ": ");
  n++;
  elements[28] = new Element(28, "Ni", "Nickel", "니켈", 10, 4, m_tr, [2,8,16,2,0,0,0], ": ");
  n++;
  elements[29] = new Element(29,"Cu","Copper (Cuprum)","구리",11,4, m_tr, [2,8,18,1,0,0,0], ": ");
  n++;
  elements[30] = new Element(30, "Zn", "Zinc", "아연", 12, 4, m_tr, [2,8,18,2,0,0,0], ": ");
  n++;
  elements[31] = new Element(31, "Ga", "Gallium", "갈륨", 13, 4, m_pt, [2,8,18,3,0,0,0], ": ");
   n++;
  elements[32] = new Element(32, "Ge", "Germanium", "저마늄 / 게르마늄", 14, 4, ml, [2,8,18,4,0,0,0], ": ");
   n++;
  elements[33] = new Element(33, "As", "Arsenic", "비소", 15, 4, ml, [2,8,18,5,0,0,0], ": ");
   n++;
  elements[34] = new Element(34, "Se", "Selenium", "셀레늄", 16, 4, nm_re, [2,8,18,6,0,0,0], ": ");
   n++;
  elements[35] = new Element(35,"Br","Bromine","브로민",17, 4, nm_ha, [2,8,18,7,0,0,0], ": ");
  n++;
  elements[36] = new Element(36,"Kr","Krypton","크립톤",18, 4, nm_ng, [2,8,18,8,0,0,0], ": ");
  n++;
  elements[37] = new Element(37,"Rb","Rubidium","루비듐",1, 5, m_al, [2,8,18,8,1,0,0], ": ");
  n++;
  elements[38] = new Element(38,"Sr","Strontium","스트론튬",2, 5, m_ae, [2,8,18,8,2,0,0],  ": ");
  n++;
  elements[39] = new Element(39,"Y","Yttrium","이트륨",3, 5, m_tr, [2,8,18,9,2,0,0], ": ");
  n++;
  elements[40] = new Element(40,"Zr","Zirconium","지르코늄",4, 5, m_tr, [2,8,18,10,2,0,0], ": ");
  n++;
  elements[41] = new Element(41,"Nb","Niobium","나이오븀 / 니오븀",5, 5, m_tr, [2,8,18,12,1,0,0],  ": ");
  n++;
  elements[42] = new Element(42,"Mo","Molybdenum","몰리브데넘",6, 5, m_tr, [2,8,18,13,1,0,0], ": ");
  n++;
  elements[43] = new Element(43,"Tc","Technetium","테크네튬",7, 5, m_tr, [2,8,18,13,2,0,0],  ": ");
  n++;
  elements[44] = new Element(44,"Ru","Ruthenium","루테늄",8, 5, m_tr, [2,8,18,15,1,0,0], ": ");
  n++;
  elements[45] = new Element(45,"Rh","Rhodium","로듐",9, 5, m_tr, [2,8,18,16,1,0,0], ": ");
  n++;
  elements[46] = new Element(46,"Pd","Palladium","팔라듐",10, 5, m_tr, [2,8,18,18,0,0,0], ": ");
  n++;
  elements[47] = new Element(47, "Ag", "Silver (Argentum)", "은", 11, 5, m_tr, [2,8,18,18,1,0,0], ": ");
  n++;
  elements[48] = new Element(48, "Cd", "Cadmium", "카드뮴", 12, 5, m_tr, [2,8,18,18,2,0,0],  ": ");
  n++;
  elements[49] = new Element(49, "In", "Indium", "인듐", 13, 5, m_pt, [2,8,18,18,3,0,0], ": ");
  n++;
  elements[50] = new Element(50, "Sn", "Tin (Stannum)", "주석", 14, 5, m_pt, [2,8,18,18,4,0,0], ": ");
  n++;
  elements[51] = new Element(51, "Sb", "Antimony (Stilbium)", "안티모니", 15, 5, ml, [2,8,18,18,5,0,0], ": ");
  n++;
  elements[52] = new Element(52, "Te", "Tellurium", "텔루륨", 16, 5, ml, [2,8,18,18,6,0,0],  ": ");
  n++;
  elements[53] = new Element(53, "I", "Iodine", "아이오딘/요오드", 17, 5, nm_ha, [2,8,18,18,7,0,0], ": ");
  n++;
  elements[54] = new Element(54, "Xe", "Xenon", "제논 / 크세논", 18, 5, nm_ng, [2,8,18,18,8,0,0], ": ");
  n++;
    elements[55] = new Element(55, "Cs", "Caesium", "세슘", 1, 6, m_al,[2,8,18,18,8,1,0], ": ");
  n++;
  elements[56] = new Element(56, "Ba", "Barium", "바륨", 2, 6, m_ae, [2,8,18,18,8,2,0], ": ");
  n++;
  elements[57] = new Element(57, "La", "Lanthanum", "란타넘", 3, 6, m_la, [2,8,18,18,9,2,0], ": ");
  n++;
  elements[n] = new Element(58, "Ce", "Cerium", "세륨", 3, 6, m_la, [2,8,18,19,9,2,0], ": ");
  n++;
  elements[n] = new Element(59, "Pr", "Praseodymium", "프라세오디뮴", 3, 6, m_la, [2,8,18,21,8,2,0], ": ");
  n++;
  elements[n] = new Element(60, "Nd", "Neodymium", "네오디뮴", 3, 6, m_la, [2,8,18,22,8,2,0], ": ");
  n++;
  elements[n] = new Element(61, "Pm", "Promethium", "프로메튬", 3, 6, m_la, [2,8,18,23,8,2,0], ": ");
  n++;
  elements[n] = new Element(62, "Sm", "Samarium", "사마륨", 3, 6, m_la, [2,8,18,24,8,2,0], ": ");
  n++;
  elements[n] = new Element(63, "Eu", "Europium", "유로퓸", 3, 6, m_la, [2,8,18,25,8,2,0], ": ");
  n++;
  elements[n] = new Element(64, "Gd", "Gadolinium", "가돌리늄", 3, 6, m_la, [2,8,18,25,9,2,0], ": ");
  n++;
  elements[n] = new Element(65, "Tb", "Terbium", "터븀", 3, 6, m_la, [2,8,18,27,8,2,0], ": ");
  n++;
  elements[n] = new Element(66, "Dy", "Dysprosium", "디스프로슘", 3, 6, m_la, [2,8,18,28,8,2,0], ": ");
  n++;
  elements[n] = new Element(67, "Ho", "Holmium", "홀륨", 3, 6, m_la, [2,8,18,29,8,2,0], ": ");
  n++;
  elements[n] = new Element(68, "Er", "Erbium", "어븀", 3, 6, m_la, [2,8,18,30,8,2,0], ": ");
  n++;
  elements[n] = new Element(69, "Tm", "Thulium", "툴륨", 3, 6, m_la, [2,8,18,31,8,2,0], ": ");
  n++;
  elements[n] = new Element(70, "Yb", "Ytterbium", "이터븀", 3, 6, m_la, [2,8,18,32,8,2,0], ": ");
  n++;
  elements[n] = new Element(71, "Lu", "Lutetium", "루테튬", 3, 6, m_la, [2,8,18,32,9,2,0], ": ");
  n++;
  elements[n] = new Element(72, "Hf", "Hafnium", "하프늄", 4, 6, m_tr, [2,8,18,32,10,2,0],  ": ");
  n++;
  elements[n] = new Element(73, "Ta", "Tantalum", "탄탈럼", 5, 6, m_tr, [2,8,18,32,11,2,0],  ": ");
  n++;
  elements[n] = new Element(74, "W", "Tungsten (Wolfram)", "텅스텐", 6, 6, m_tr, [2,8,18,32,12,2,0], ": ");
  n++;
  elements[n] = new Element(75, "Re", "Rhenium", "레늄", 7, 6, m_tr, [2,8,18,32,13,2,0], ": ");
  n++;
  elements[n] = new Element(76, "Os", "Osmium", "오스뮴", 8, 6, m_tr, [2,8,18,32,14,2,0], ": ");
  n++;
  elements[n] = new Element(77, "Ir", "Iridium", "이리듐", 9, 6, m_tr, [2,8,18,32,15,2,0], ": ");
  n++;  
  elements[n] = new Element(78, "Pt", "Platinum", "백금 / 플래티넘", 10, 6, m_tr, [2,8,18,32,17,1,0], ": ");
  n++;
  elements[n] = new Element(79, "Au", "Gold (Aurum)", "금", 11, 6, m_tr, [2,8,18,32,18,1,0], ": ");
  n++;
  elements[n] = new Element(80,"Hg","Mercury (Hydrargyrum)","수은",12,6, m_tr, [2,8,18,32,18,2,0], ": ");
  n++;
 elements[n] = new Element(81, "Tl", "Thallium", "탈륨", 13, 6, m_pt, [2,8,18,32,18,3,0], ": ");
  n++;  
  elements[n] = new Element(82, "Pb", "Lead (Plumbum)", "납", 14, 6, m_pt, [2,8,18,32,18,4,0], ": ");
  n++;
  elements[n] = new Element(83, "Bi", "Bismuth", "비스무트", 15, 6, m_pt, [2,8,18,32,18,5,0], ": ")
  n++;
  elements[n] = new Element(84, "Po", "Polonium", "폴로늄", 16, 6, m_pt, [2,8,18,32,18,6,0], ": ");
  n++;
  elements[n] = new Element(85, "At", "Astatine", "아스타틴", 17, 6, nm_ha, [2,8,18,32,18,7,0], ": ");
  n++;
  elements[n] = new Element(86, "Rn", "Radon", "라돈", 18, 6, nm_ng, [2,8,18,32,18,8,0], ": ");
  n++;
  elements[n] = new Element(87, "Fr", "Francium", "프랑슘", 1, 7, m_al,[2,8,18,32,18,8,1], ": ");
  n++;
  elements[n] = new Element(88, "Ra", "Radium", "라듐", 2, 7, m_ae, [2,8,18,32,18,8,2], ": ");
  n++;
  elements[n] = new Element(89, "Ac", "Actinium", "악티늄", 3, 7, m_ac, [2,8,18,32,18,9,2], ": ");
  n++;
  elements[n] = new Element(90, "Th", "Thorium", "토륨", 3, 7, m_ac, [2,8,18,32,18,10,2], ": ");
  n++;
  elements[n] = new Element(91, "Pa", "Protactinium", "프로트악티늄", 3, 7, m_ac, [2,8,18,32,20,9,2], ": ");
  n++;
  elements[n] = new Element(92, "U", "Uranium", "우라늄", 3, 7, m_ac, [2,8,18,32,21,9,2], ": ");
  n++;
  elements[n] = new Element(93, "Np", "Neptunium", "넵투늄", 3, 7, m_ac, [2,8,18,32,22,9,2], ": ");
  n++;
  elements[n] = new Element(94, "Pu", "Plutonium", "플루토늄", 3, 7, m_ac, [2,8,18,32,24,8,2], ": ");
  n++;
  elements[n] = new Element(95, "Am", "Americium", "아메리슘", 3, 7,  m_ac, [2,8,18,32,25,8,2], ": ");
  n++;
  elements[n] = new Element(96, "Cm", "Curium", "퀴륨", 3, 7, m_ac, [2,8,18,32,25,9,2], ": ");
  n++;
  elements[n] = new Element(97, "Bk", "Berkelium", "버클륨", 3, 7, m_ac,[2,8,18,32,27,8,2],  ": ");
  n++;
  elements[n] = new Element(98, "Cf", "Californium", "캘리포늄", 3, 7, m_ac, [2,8,18,32,28,8,2], ": ");
  n++;
  elements[n] = new Element(99, "Es", "Einsteinium", "아인슈타이늄", 3, 7, m_ac, [2,8,18,32,29,8,2], ": ");
  n++;
  elements[n] = new Element(100, "Fm", "Fermium", "페르뮴", 3, 7, m_ac,[2,8,18,32,30,8,2],  ": ");
  n++;
  elements[n] = new Element(101, "Md", "Mendelevium", "멘델레븀", 3, 7, m_ac, [2,8,18,32,31,8,2], ": ");
  n++;
  elements[n] = new Element(102, "No", "Nobellium", "노벨륨", 3, 7, m_ac, [2,8,18,32,32,8,2], ": ");
  n++;
  elements[n] = new Element(103, "Lr", "Lawrencium", "로렌슘", 3, 7, m_ac, [2,8,18,32,32,8,3], ": ");
  n++;
  elements[n] = new Element(104, "Rf", "Rutherfordium", "러더포듐", 4, 7, m_tr, [2,8,18,32,32,10,2], ": ");
  n++;
  elements[n] = new Element(105, "Db", "Dubnium", "더브늄", 5, 7, m_tr, [2,8,18,32,32,11,2], ": ");
  n++;
  elements[n] = new Element(106, "Sg", "Seaborgium", "시보귬", 6, 7, m_tr, [2,8,18,32,32,12,2], ": ");
  n++;
  elements[n] = new Element(107, "Bh", "Bohrium", "보륨", 7, 7, m_tr, [2,8,18,32,32,13,2], ": ");
  n++;
  elements[n] = new Element(108, "Hs", "Hassium", "하슘", 8, 7, m_tr, [2,8,18,32,32,14,2], ": ");
  n++;
  elements[n] = new Element(109, "Mt", "Meitnerium", "마이트너륨", 9, 7, m_tr,[2,8,18,32,32,15,2], ": ");
  n++;
  elements[n] = new Element(110, "Ds", "Darmstadtium", "다름슈타튬", 10, 7, m_tr, [2,8,18,32,32,16,2], ": ");
  n++;
  elements[n] = new Element(111, "Rg", "Roentgenium", "뢴트게늄", 11, 7, m_tr, [2,8,18,32,32,17,2],": ");
  n++;
  elements[n] = new Element(112, "Cn", "Copernicium", "코페르니슘", 12, 7, m_tr, [2,8,18,32,32,18,2], ": ");
  n++;
  elements[n] = new Element(113, "Nh", "Nihonium", "니호늄", 13, 7, m_pt, [2,8,18,32,32,18,3], ": ");
  n++;
  elements[n] = new Element(114, "Fl", "Flerovium", "플레로븀", 14, 7, m_pt, [2,8,18,32,32,18,4], ": ");
  n++;
  elements[n] = new Element(115, "Mc", "Moscovium", "모스코븀", 15, 7, m_pt, [2,8,18,32,32,18,5], ": ");
  n++;
  elements[n] = new Element(116, "Lv", "Livermorium", "리버모륨", 16, 7, m_pt, [2,8,18,32,32,18,6], ": ");
  n++;
  elements[n] = new Element(117, "Ts", "Tennessine", "테네신", 17, 7, nm_ha, [2,8,18,32,32,18,7], ": ");
  n++;
  elements[n] = new Element(118, "Og", "Oganesson", "오가네손", 18, 7, nm_ng, [2,8,18,32,32,18,8], ": ");
  n++;
  // label_la, m_la
  elements[n] = new Element(57, "-71", "Lanthanide", "란타넘족", 3, 6, label_la, [0,0,0,0,0,0,0], ": ");
  n++;
 elements[n] = new Element(89, "-103", "Actinide", "악티늄족", 3, 7, label_ac, [0,0,0,0,0,0,0], ": ");
  n++;

}
