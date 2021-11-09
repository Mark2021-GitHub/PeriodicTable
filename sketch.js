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

let strPhases = ["고체(Solid)", "액체(Liquid)", "기체(Gas)"];

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
let rep = 14; // 전형원소

let solid =0; // 상온에서 상태: 고체, 액체, 기체
let liquid= 1;
let gas=2;

var inputForm = document.querySelector("form");
var inputTxt = document.querySelector(".txt");
var playNextButton = document.getElementById("playNext");
var searchButton = document.getElementById("search");
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
  csbox[0] = new csBox(l, t, vs*6-3, 20, "금속", m, font1, "[금속,Metals]은 일반적으로 상온에서 고체 상태로 존재하며, 특유의 광택을 띠고 열과 전기를 잘 전달하는 도체로, 연성과 전성을 갖는다. 주기율표 상에 위치하는 118개의 원소 중 대략 4분의 3 정도가 일반적인 금속의 정의에 해당된다. 보통 금속 원소는 전자를 잃고 양이온이 되기 쉬우며, 비금속은 반대로 전자를 얻기 쉽다.");
  csbox[1] = new csBox(l+vs*7, t, vs*3, 20, "비금속", nm, font1,"[Nonmetals]");
  csbox[2] = new csBox(l+vs*6, t, vw, vh-30, "준금속", ml,font2, "[준금속,  Metalloids]은 금속과 비금속의 경계에 있어서 중간 성질을 띄는 화학 원소 계열이다. 일반적으로 5-B, 14-Si, 32-Ge, 33-As 51-Sb, 52-Te, 84-Po 를 준금속으로 분류한다.");
    csbox[3] = new csBox(l, vy, vw, vh, "알칼리 금속", m_al,font2, "수소를 제외한 1족 원소들은 알칼리 금속(alkali metal)이라고 불린다. 물과 반응해 염기성 용액을 만들고, 높은 반응성을 가진 금속들이다.");
  csbox[4] = new csBox(l+vs, vy, vw, vh, "알칼리 토금속", m_ae, font2, "2족은 알칼리 토금속(alkali earth metal)이라고 불린다. 물과 반응해 염기성 용액을 생성하지만 반응성이 낮아 폭발하지는 않는다.");
   csbox[5] = new csBox(l+vs*4, vy+20, vw, vh-20, "전이 금속", m_tr,font2, "[Metals - Transition metals]"); 
  csbox[6] = new csBox(l+vs*5, vy, vw, vh, "전이후 금속", m_pt,font2, "[Metals - Post-transition metals]");
  csbox[7] = new csBox(l+vs*2, vy+30, vw, vh-30, "란타넘족", m_la,font2, "[Metals - Lanthanide]"); 
  csbox[8] = new csBox(l+vs*3, vy+30, vw, vh-30, "악티늄족", m_ac,font2, "[Metals - Actinoid]");
  csbox[9] = new csBox(l+vs*7, vy, vw, vh, "반응성 비금속", nm_re,font2, "[Nonmetals - Reactive nonmetals]");
  csbox[10] = new csBox(l+vs*8, vy, vw, vh, "할로젠", nm_ha,font2, "Group 17: Halogen - 1가 음이온이 되는 원소들로 1족 원소(1가 양이온)들과 격렬하게 반응하여 염을 생성");
   csbox[11] = new csBox(l+vs*9, vy, vw, vh, "비활성 기체", nm_ng,font2, "Group 18: Noble gas - 불활성 기체라고도 하는 18족 원소들은 최외각 전자껍질이 완전히 채워져 있어 반응성이 매우 낮고, 상온에서 모두 기체 상태로 존재, 물질의 보호에 널리 사용");
  
  repbox = new csBox(l, t-30, vs*10, 20, "전형원소", rep,font1, "전형원소(Typical element 또는 Main-group element) 는 1~2족, 13~18족 원소들로 족별로 유사한 성질을 보이는 원소들을 의미한다.");

  
}  

var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = dtText.offsetTop + 120  ;
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
    showAtom(elements[next].id, elements[next].shell);
    showBox(next); 
  } else {
    for (let i = 1; i < n; i++) {
   
      if( elements[i].contains(mouseX, mouseY) ){
        dtText.innerText = elements[i].str;
        ddText.innerText = elements[i].desc;
        showIon(elements[i].id, elements[i].shell);
        showBox(i);
        elements[i].show(true);
      } else {
        elements[i].show(false);
      }
    }
  }
  
  showSeries(); 
  if(bLoop.checked == false){ 
    noLoop();
  }
}

//
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

// Period, Group Label
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
  
  // 상온 상태
  
  textSize(13);
  fill(0);
  text("[기호 색깔] ▶︎ 상온 상태", w*4 +13, tableBot-w*6-30);
  fill(255,0,0);
  text("빨간색 ▶︎ 기체", w*5, tableBot-w*6 -15);
  fill(0,0,255);
  text("파란색 ▶︎ 액체", w*5, tableBot-w*6 );
  fill(0);
  text("흰   색 ▶︎ 고체", w*5, tableBot-w*6+15);
  
  
}

class Element {
  constructor(id, s, ename, kname, px, py, ptclass, shell, phase, desc, meltingP, boilingP, density) {
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
    
    this.phase = phase;
    this.shell = shell;
    this.meltingP = meltingP;
    this.boilingP = boilingP;
    this.density = density;
    
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
    
      if(this.phase == gas)
      {
          fill(255,0,0);  
      } else if (this.phase == liquid) {
          fill(0,0,255); 
      } else {
          fill(255);
      }
      
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
let l = w*2+2;
let t = h;
let bw = 5*w+10;
let bh = 5*h-20;
let r = l+bw;
let b = t + bh;

// 원소 상세 설명 상자 표시
function showBox(id) {
  fill(elements[id].fillc);
  stroke(0);
  rect(l,t,bw,bh);
  
  //전자껍질 표시
  fill (255);
  textSize(15);
  textAlign(LEFT, BASELINE);
  for(let s=0; s<7; s++) {
    let e = elements[id].shell[s]; 
    if( e == 0 ) {
      break;
    } 
    let ch = char(75+s); // K(75), L,M,N,O,P,Q
    text(ch,r-40, t+(s+2)*h/2);
    text(e,r-20, t+(s+2)*h/2);
  }
  
  //원소 번호
  textSize(15);
  text(elements[id].id,l+5, t+20);
  
  // 원소 기호
  textSize(30);
  textStyle(BOLD);
  if(elements[id].phase == gas)
      {
          fill(255,0,0);  
          
      } else if (elements[id].phase == liquid) {
          fill(0,0,255); 
      } else {
          fill(255);
      }
  text(elements[id].s,l+30, t+30); 
  
  //한글 원소명
  fill(255);
  textSize(13);
  textStyle(NORMAL);
  textWrap(WORD); 
  text(elements[id].kname,l+75, t+15); 
  //영어 원소명
  textSize(13);
  text(elements[id].ename,l+75, t+20,95);
  
  // 상온에서 상태 표시
  // text( strPhases[elements[id].phase], l+5, b-55);
  // 녹는점, 끓는점, 밀도 
  textSize(13);
  text("녹는점: " + elements[id].meltingP + "℃",l+5, t+60);
  text("끓는점: " + elements[id].boilingP + "℃",l+5, t+75);
  text("밀   도: " + elements[id].density,l+5, t+90);
  
  
  
  
  // 원소 분류 
  textSize(13)
  text("["+ mseries[elements[id].ptclass] +"]",l+5, b-35);
  textSize(13);
  text(kseries[elements[id].ptclass],l+5, b-20);
  text(eseries[elements[id].ptclass],l+5, b-5);
  
}

let atomx = 10*w+20;
let atomy = 3*h+10;



function showIon(id,shell){
  let eIon = 0; 
  push();
  translate(atomx,atomy);
  
  // atom's background
  fill(255);
  noStroke();
  circle(0,0,180); 
  
  for(let s=0; s<7; s++) { 
      let e = shell[s]; 
      if(e == 0 ) break;
     
      noFill();
      stroke(100);
      let orbit = (s+2)*20; // orbit diameter;
      circle(0,0, orbit); // show shell orbit
     
      let angle = TWO_PI/e;
      let theta = 0;
      let r = orbit/2;
      let ex = r*cos(0);
      let ey = r*sin(0);
    
    // if this is outermost shell
      if( shell[s+1] ==0 || s == 6) {
          eIon = shell[s];
          
         if( eIon < 4 && id != 2) { 
             noFill (); 
             for(let ei=0; ei<e; ei++){
                push();
                ex = r*cos(theta);
                ey = r*sin(theta);
                translate(ex, ey);
                circle(0,0,5);
                pop();
                theta += angle;
            }  
            fill(255,0,0);  
            let rb = 90;
             theta = 0;
            for(let ei=0; ei<e; ei++){
                push();
                ex = rb*cos(theta);
                ey = rb*sin(theta);
                translate(ex, ey);
                circle(0,0,5);
                pop();
                theta += angle;
            }
        } else if ( 5 <= eIon && eIon <= 7  ) {
          let fe = 8 - e;
          angle = TWO_PI/8;
           
          for(let ei=0; ei<8; ei++){
              if(ei<e) {
                fill(255,0,0);  
              } else {
                fill(255,255,0);  
              }
                push();
                ex = r*cos(theta);
                ey = r*sin(theta);
                translate(ex, ey);
                circle(0,0,5);
                pop();
                theta += angle;
            }  
        } else { // eIon = 4, 8
          fill(255,0,0);  
          for(let ei=0; ei<e; ei++){
                push();
                ex = r*cos(theta);
                ey = r*sin(theta);
                translate(ex, ey);
                circle(0,0,5);
                pop();
                theta += angle;
            }  
        }
      } else {
        fill(0,200,255);  
        for(let ei=0; ei<e; ei++){
            push();
            ex = r*cos(theta);
            ey = r*sin(theta);
            translate(ex, ey);
            circle(0,0,5);
            pop();
            theta += angle;
        }  
      }
    
    
    
    
      
      
     
  }
  
 
  
  // proton, neutron
  fill(125);
  circle(0,0,25); 
  textSize(13);
  fill(255);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(elements[id].s,-3,3);  // atom symbol
  
  textAlign(LEFT,BASELINE);
  fill(0);
  
  if( eIon < 4 && id != 2 ) { 
    if( eIon >1 ) {
      text(eIon + "+", 2,-4);
    } else {
      text(" +", 2,-4);
    }
    
  } else if ( 5 <= eIon && eIon <= 7  ) {
    let fe = 8 -eIon;
    if( fe >1 ){
      text(fe + "-", 2,-4);
    } else {
      text("-", 2,-4);
    }
    
  } else if ( eIon == 4) {
    text(eIon + "+", 2,-4);
    text(eIon + "-", 2,-15);
    
  } else if ( eIon == 8) {
  }
  
  
  pop();
       
}

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
  text(id,0,0);  // atom number
  
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
           fill(255,0,0);   
          } else {
           fill(0,200,255);  
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






playNextButton.onclick = function (){
  playNext();
}

searchButton.onclick = function (){
  search();
}

function search(){
  //print(inputTxt.value);
  let regexp = inputTxt.value;
  
  for (let i = 1; i < n; i++) {
    let m = match(elements[i].str, regexp); 
    if( m != null ){
    //    print ("Found:" + elements[i].str);
        next = i;
        playNext();
        break;
    }      
  }
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
  elements[1] = new Element(1, "H", "Hydrogen", "수소", 1, 1, nm_re, [1,0,0,0,0,0,0], gas, "우주와 생명의 근원: 빅뱅으로 탄생한 초기 우주의 대부분은 수소와 헬륨으로 채워져 있었는데 이후 핵융합을 거쳐 더욱 무거운 원소들로 바뀌면서 다양한 물질과 행성이 탄생했다. 물을 뜻하는 그리스어 Hydro-라는 어원을 가진 수소는 생명의 근원인 물을 만들어 낸다. 인간의 몸의 70%가 물이고, 단백질, 탄수화물, 지방 역시 수소를 포함하고 있으므로 수소는 생명의 핵심 요소라고 할 수 있다.",-259, -253, "0.09g/L");
  n++;
  elements[2] = new Element(2, "He", "Helium", "헬륨", 18, 1, nm_ng, [2,0,0,0,0,0,0], gas, "수소 다음으로 가벼우며 수소와 딜리 반응성이 낮아서 안전하기 때문에 풍선이나 기구 등을 띄울 때 사용한다. 모든 원소 중에서 끓는점과 녹는점이 가장 낮은 원소로 극저온 처리가 필요한 경우에 액체 헬륨이 중요하게 쓰인다.", -272, -269, "0.179g/L");
  n++;
  elements[3] = new Element(3, "Li", "Lithium", "리튬", 1, 2,  m_al, [2,1,0,0,0,0,0], solid, "물에 둥둥 뜨는 리튬은 비중이 0.534로 존재하는 모든 금속들 중 가장 가볍다. 노트북, 스마트폰 등의 휴대전자제품에는 가볍고 발생 전압은 높으며 전류 용량은 큰 리튬 이온 전지가 주로 사용된다. 알칼리 금속의 시작 원소인 리튬은 전자를 내보내 양이온이 되기 쉬어 물과 반응해 수소를 발생시킨다. 리튬 화합물은 빨간색 불불꽃 반응을 나타낸다.", 181, 1347, "0.534g/cm3");
  n++;
  elements[4] = new Element(4, "Be", "Beryllium", 
                            "베릴륨", 2, 2, m_ae, [2,2,0,0,0,0,0], solid, "달콤한 독이라고도 불리는 베릴륨은 보석으로 가치가 있는 녹주석(beryl)에 함유되어 있으며, 특유의 녹색 빛깔을 낸다. 발견 초기에는 단맛 때문에 사람들이 먹기도 했는데 사실은 심각한 폐 질환을 유발한다는 사실이 밝혀져 지금은 공업용으로만 활용된다. 구리, 니켈, 알루미늄 등에 베릴륨을 첨가하면 강철보다 강도가 50% 이상 높고, 알루미늄 보다 가볍고, 전기전도도와 열전도도는 높고, 마모와 부식에 강하고, 탄성도 높은 합금이 된다. 이러한 베릴륨 합금은 정밀 기계, 항공기용 엔진, 항공 우주 산업에 이용된다.", 1287, 2472, "1.85g/cm3");
  n++;
  elements[5] = new Element(5, "B", "Boron", "붕소", 13, 2, ml, [2,3,0,0,0,0,0], solid, "붕소는 홑원소 물질로는 거의 이용되지 않지만 화합물의 쓰임새는 다양하다. 흑회색 고체이지만 유리에 섞으면 투명해지는데, 이렇게 붕소를 넣어 만드는 붕규산 유리는 열팽창률이 작아 조리용 주전자, 화학실험 플라스크, 비커 등의 내열 유리 재료로 쓰인다. 붕산(H3BO3)은 살균작용이 있어 바퀴벌레약이나 눈 세정제 등의 약품에 널리 사용된다.붕산을 포함한 붕산수는 고속 중성자를 매우 잘 흡수하기 때문에 고준위 방사성 폐기물을 담구어 보관하거나 원자로의 비상냉각시스템에 쓰인다.", 2077, 3870, "2.34g/cm3");
  n++;
  elements[6] = new Element(6, "C", "Carbon", "탄소", 14, 2, nm_re,[2,4,0,0,0,0,0], solid, "탄소는 지각을 구성하는 원소들 중에 15번째로 풍부하며, 우주에서는 수소, 헬륨, 산소 다음인 4번째로 풍부한 원소이고, 우리 몸에서는 산소 다음인 두 번째로 풍부한 원소(18.5%)이다. 탄소는 유사 이전부터 목탄의 형태로 사용되어 왔으며, carbon이라는 이름은 숯을 뜻하는 라틴어 carbo에서 왔다. 탄소는 수많은 화합물을 결합한다. 표준 조건 하에서 이론적으로 가능한 화합물은 지금까지 밝혀진 것만 약 1천만 개 정도이다. 그래서 탄소를 '원소의 제왕'이라고 부른다. 탄소는 다이아몬드, 흑연 등 물리적 성질이 다른 다양한 동소체(같은 원소로 구성되어 있으나 구조가 다른 물질)가 있다.", 3550, 4827, "3.513g/cm3");
  n++;
  elements[7] = new Element(7, "N", "Nitrogen", "질소", 15, 2,nm_re, [2,5,0,0,0,0,0], gas, "질소는 지구 대기에서 가장 많은 비중(78%)을 차지하며,  동물의 몸을 구성하는 아미노산의 핵심 원소이고, 인, 포타슘과 함께 비료의 3대 요소로 꼽힌다. 모든 동식물은 질소를 반드시 일정량 이상 섭취해야 생명을 유지할 수 있다. 끓는점(영하 196℃) 이하에서 액화된 액체 질소는 아이스크림 제조, 물질의 급속 동결, 보존 등에 사용된다. 노벨이 발명한 다이너마이트, TNT 폭약 등은 모두 질소 화합물로 만들어진다. 1차 세계대전 중에 폭약 제조에 필요한 암모니아를 생산하기 위해  질소와 수소를 직접 반응시켜 대량의 암모니아를 생산하는 하버-보슈법이 개발된다. 덕분에 인류는 전쟁 이후 질소 비료를 대량으로 만들수 있게 되어 녹색 혁명이 시작되었다.", -210, -196, "1.251g/L");
  n++;
  elements[8] = new Element(8, "O", "Oxygen", "산소", 16, 2,nm_re, [2,6,0,0,0,0,0], gas, "산소가 처음으로 지구 대기에 나타난 것은 고원생대로, 혐기성 생물의 물질 대사 과정의 부산물로 만들어졌다. 산소의 증가는 그 당시 대부분의 생물들을 죽음으로 몰아 갔으나, 반대로 산소를 이용하는 새로운 생물이 등장하는 계기가 되었다. 또한 오존층의 형성으로 육상생물이 등장하는 계기도 마련해주었다. 산소는 대부분 광합성 작용으로 만들어지는데, 약 4분의 3은 대양의 식물성 플랑크톤과 조류가, 나머지 4분의 1은 육상 식물이 만든다. 사람에게도 생명활동에 꼭 필요한 물질로써, 산소가 결핍되면 5분이 지나 뇌사 상태에 빠지고 8분 뒤면 사망한다. 사람을 비롯한 동물군의 체내에서 산소를 운반하는 것은 적혈구의 주요 역할이다.  건조한 공기에서 산소는 부피 백분율로 21%을 차지한다. 산소의 동소체는 호흡에 사용되는 이원자 분자 형태의 산소O2와 삼원자 분자 형태의 오존(O3)이 있다. 오존층은 지표로부터 15~40km 고도에 위치하고 있는데, 생명체에게 해로운 우주 단파 자외선을 거의 흡수한다.", -218, -183, "1.429g/L(0℃)");
  n++;
  elements[9] = new Element(9, "F", "Fluorine","플루오린 / 불소",17,2,nm_ha,  [2,7,0,0,0,0,0], gas,  "살충제를 뿌려도 잘 죽지 않는 바퀴벌레도 플루오린이 든 치약에 닿으면 몇 분 안에 죽는다.많은 화확자들이 플로오린 분리 실험을 하다 죽었고, 분리에 성공해 노벨상을 수상한 프랑스 화학자 무아상은 실명했다. 뼈,유리, 세라믹을 녹이기 때문에 적은 양의 플루오린은 치아에 미세한 구멍이 무수히 생기는 충치 초기에 구멍을 녹여 보수하는 효과가 있다. 하지만 적은 양이라도 플루오린이 몸에 쌓이면 뼈를 무르게 하기 때문에 플루오린 치약을 사용한 후에는 반드시 입을 잘 헹궈 주어야 한다. 플루오린 화합물인 폴리테트라플루오로에틸렌은  내산성, 내열성, 절연성이 뛰어나 조리 기구의 코팅제로 널리 사용되고, 이를 섬유로 가공한 고어텍스는 방풍 방습 기능의 의류 제작에 이용된다.", -22, -188, "1.696g/L(0℃)");
  n++;
  elements[10] = new Element(10, "Ne", "Neon", "네온", 18, 2,nm_ng, [2,8,0,0,0,0,0], gas,  "반응성이 굉장히 낮은 18족 비활성 기체 원소들은 화합물이 관찰되지 않아 뒤늦게 알려졌다. 영국 화학자 윌리엄 램지는 공기를 냉각시켜 그 안에 존재하는 네온, 아르곤, 크립톤, 제논을 발견했고, 지금도 비활성 기체는 대기나 천연가스에서 분리하기 때문에 값이 매우 비싸다. 네온은 지구 대기의 0.00182%에 불과하다. 네온은 전압을 가하면 붉은색 빛을 내는데 유리관에 네온을 채워 넣고 전압을 흘리면 붉게 빛나는 간판을 만들수 있다. 노란색, 파란색 불빛은 각각 헬륨, 아르곤을 채워서 만들지만 모두 네온사인이라 부르게 되었다. 붉은색 레이저는 헬륨-네온을 광원으로 사용한다.", -249, -246, "0.9g/L(0℃)");
  n++;
  elements[11] = new Element(11,"Na","Sodium (Natrium)","소듐 / 나트륨",1,3, m_al, [2,8,1,0,0,0,0], solid, "1족 알칼리 금속인 소듐은 물과 만나면 리튬처럼 발열하며 수소를 발생시키고 폭발을 일으킨다. 반응성과 폭발력은 리튬보다 강해서 10cm정도의 소듐 막대를 물에 던지면 3m에 이르는 폭발이 일어난다. 또한 산소와 만나면 반응성이 낮은 산화소듐으로 변하므로 소듐은 물과 공기에 닿지 않도록 석유에 담가 보관한다. 소듐은 포타슘과 함께 뇌로 신경 자극을 전달하며, 세포의 삼투압을 조절한다. 바닷물 속 소금에 풍부하게 존재하는 무른 금속", 98, 883, "0.971g/cm3" );
  n++;
  elements[12] = new Element(12,"Mg","Magnesium","마그네슘",2,3, m_ae, [2,8,2,0,0,0,0],  solid, "연소할 때 밝은 백색광을 내므로 섬광탄, 폭죽, 초창기 카메라 플래쉬 등으로 활용되는 금속, 탄산마그네슘 화합물은 습기 제거 기능이 있어서 암벽 등반가나 운동선수들이 손에 바르는 분말로 사용된다.", 650, 1090, "1.738g/cm3");
  n++;
  elements[13] = new Element(13,"Al","Aluminium","알루미늄",13,3, m_pt, [2,8,3,0,0,0,0],  solid, ": 가볍고, 열 전도성이 좋아 다양한 합금 소재로 산업에서 널리 활용되는 금속", 660, 2520, "2.698g/cm3");
  n++;
  elements[14] = new Element(14,"Si","Silicon","규소 / 실리콘",14,3, ml, [2,8,4,0,0,0,0], solid,  "대표적인 반도체인 규소는 지각에 산소 다음으로 풍부하게 존재한다. ", 1412, 3266, "2.329g/cm3");
  n++;
  elements[15] = new Element(15, "P", "Phosphorus", "인", 15, 3, nm_re, [2,8,5,0,0,0,0], solid,  "소변에서 추출되는 생체 화합물의 필수 원소인 비금속", 44 , 280, "1.82g/cm3");
  n++;
  elements[16] = new Element(16, "S", "Sulfur", "황", 16, 3, nm_re, [2,8,6,0,0,0,0],  solid, "화산지대에서 직접 채굴 되는 냄새가 지독한 노란색 비금속인 황은 살충제, 살균제, 파마 약, 의약품, 축전지 등 산업 분야에 널리 쓰인다. 황화합물인 황화수소는 가수 누출을 냄새를 감지하는데 이용된다. 지옥을 유황으로 된 끓는 연못이라고 묘사한 성경 구절을 근거로 지옥의 온도는 황의 긇는점 444.6도로 추론한다.", 112.8, 444.7, "2.07g/cm3"); 
  n++;
  elements[17] = new Element(17, "Cl", "Chlorine", "염소", 17, 3, nm_ha, [2,8,7,0,0,0,0], gas,  "1차 세계대전 때 독가스로 사용된 무시무시한 독성을 가진 기체. 오늘날에는 살균, 소독을 위해 수돗물과 수영장 물에 쓰인다. '락스'라고 알려진 염소가 포함된 표백제는 옷을 몇 분만에 표백시킨다. 전세계적으로 사용되어 온 DDT 라는 염소 기반 농약은 가장 효과적인 살충제로 많이 이용됐는데 심각한 환경오염과 생태계를 파괴하는 사실이 뒤늦게 밝혀져 지금은 거의 사용하지 않는다. 상온에서 자극적인 냄새가 있는 황록색 기체로 존재한다.", -100.98, -34.1, "3.214g/L");
  n++;
  elements[18] = new Element(18, "Ar", "Argon", "아르곤", 18, 3, nm_ng, [2,8,8,0,0,0,0], gas, "헬륨이나 네온과 같이 반응성이 거의 없는 비활성 기체인 아르곤은 수술용 레이저메스로도 용되고, 치과에서 치아를 하얗게 만들기 위해 아르곤 레이저를 사용하기도 한다. ", -189, -186, "1.784g/L" );
  n++;
  elements[19] = new Element(19, "K","Potassium (Kalium)","포타슘 / 칼륨",1,4, m_al, [2,8,8,1,0,0,0], solid, "무른 알칼리 금속인 포타슘은 리튬과 소듐처럼 물과 반응해 폭발하는데, 반응성은 두 원소보다 훨씬 높다. 포타슘은 손 위에 올려놓기만 해도 손의 수분과 반응해 불이 붙고 폭발하므로 특히 주의해서 다뤄야 한다.질소, 인과 함께 비료의 3요소로 꼽히는 포타슘을 너무 많이 섭취하면 심장마비가 올 수 있다. 염화포타슘은 심장 수술을 할 때 일시적으로 심장을 멈추는 심정지액으로  쓰인다.", 63.65, 774, "0.862g/cm3");
  n++;
  elements[20] = new Element(20, "Ca", "Calcium", "칼슘", 2, 4, m_ae, [2,8,8,2,0,0,0], solid,  "시멘트와 대리석, 뼈와 치아의 주성분이 되는 금속. 황산칼슘은 두부 응고제로, 탄산칼슘은 분필로, 염화칼슘은 제설제로, 인산칼슘은 인공치아나 뼈 등으로 사용되는 등 실생활에 유용한 다양한 칼슘 화합물이 존재.", 839, 1480, "1.55g/cm3");
  n++;
  elements[21] = new Element(21, "Sc", "Scandium", "스칸듐", 3, 4, m_tr, [2,8,9,2,0,0,0],  solid, ": 멘델레예프가 예언한 원소로 태양처럼 밝은 빛을 내는 희소 금속(전이 금속)", 1540, 2830, "2.989g/cm3" );
  n++;
  elements[22] = new Element(22, "Ti", "Titanium", "타이타늄", 4, 4, m_tr, [2,8,10,2,0,0,0], solid,  ": 금속(전이 금속)",  1660, 3300, "4.5g/cm3");
  n++;
  elements[23] = new Element(23, "V", "Vanadium", "바나듐", 5, 4, m_tr, [2,8,11,2,0,0,0], solid,  ": 금속(전이 금속)", 1890, 3400, "6.11g/cm3");
  n++;
  elements[24] = new Element(24, "Cr", "Chromium", "크로뮴", 6, 4, m_tr, [2,8,13,1,0,0,0], solid,  ": 금속(전이 금속)", 1860, 2670, "7.188g/cm3");
  n++;
  elements[25] = new Element(25,"Mn","Manganese","망가니즈 / 망간", 7, 4, m_tr, [2,8,13,2,0,0,0],  solid, ": 금속(전이 금속)", 1240, 1960, " 7.44g/cm3");
  n++;
  elements[26] = new Element(26, "Fe", "Iron (Ferrum)", "철", 8, 4, m_tr, [2,8,14,2,0,0,0], solid, "철은 매우 유용한 금속이지만 산화가 잘돼 쉽게 녹이 슨다. 그래서 주로 다른 금속과 섞거나 녹에 강한 금속으로 도금하거나 표면에 녹 방지용 도료를 칠해 사용한다.", 1540, 2750, "7.874g/cm3");
  n++;
 elements[27] = new Element(27, "Co", "Cobalt", "코발트", 9, 4, m_tr, [2,8,15,2,0,0,0],  solid, "코발트는 타일이나 도자기의 푸른빛을 내는 데 사용해 왔다.", 1490, 2870, "8.9g/cm3");
  n++;
  elements[28] = new Element(28, "Ni", "Nickel", "니켈", 10, 4, m_tr, [2,8,16,2,0,0,0],  solid, "니켈은 산화 반응을 일으키지 않기 때문에 동전을 만들 때 니켈 도금이나 니켈 합금이 많이 이용된다. 미국의 5센트는 '니클'이라고 불리는 이유이다.", 1450, 2730, "8.902g/cm3");
  n++;
  elements[29] = new Element(29,"Cu","Copper (Cuprum)","구리",11,4, m_tr, [2,8,18,1,0,0,0],  solid, "항균성이 뛰어난 금속으로 손잡이나 버튼등 사람 손이 많이 타는 곳에 구리가 쓰인다. 동전에도 알루미늄, 아연 등과 함께 많은 양의 구리가 들어 있다. 전기 전도성과 열 투과성이 뛰어나고, 은,알루미늄,금 보다는 저렴하기 때문에 전선과 전자 회로에 많이 쓰인다.", 1083, 2570, "8.96g/cm3");
  n++;
  elements[30] = new Element(30, "Zn", "Zinc", "아연", 12, 4, m_tr, [2,8,18,2,0,0,0], solid,  "인슐린, 성장 호르몬, 성 호르몬 등의 다양한 효소작용를 돕기 때문에 우리 몸에 반드시 필요한 원소로 생굴과 육류에 풍부하게 존재한다. 아연이 부족하면 면역 기능 저하, 성장이 지연될 수 있다.아연은 기원전부터 사용된 금속 원소로 대표적으로 '함석'이라 불리는 아연 도금된 철강은 내부식 효과가 뛰어나다.또한 최초의 전지인 볼타 전지부터 수은,연료,알칼리 전지까지 수많은 건전지의 음극을 만드는데 아연이 쓰인다.", 419.58, 907, "7.133g/cm3");
  n++;
  elements[31] = new Element(31, "Ga", "Gallium", "갈륨", 13, 4, m_pt, [2,8,18,3,0,0,0], solid,  ": ");
   n++;
  elements[32] = new Element(32, "Ge", "Germanium", "저마늄 / 게르마늄", 14, 4, ml, [2,8,18,4,0,0,0],  solid, ": ");
   n++;
  elements[33] = new Element(33, "As", "Arsenic", "비소", 15, 4, ml, [2,8,18,5,0,0,0],  solid, ": ");
   n++;
  elements[34] = new Element(34, "Se", "Selenium", "셀레늄", 16, 4, nm_re, [2,8,18,6,0,0,0], solid,  ": ");
   n++;
  elements[35] = new Element(35,"Br","Bromine","브로민",17, 4, nm_ha, [2,8,18,7,0,0,0], liquid, "상온에서 미끈거리는 액체 상태로 존재하고 적갈색(보라색)을 띠는 브로민은 수천개의 조개껍질에서 고작 1그램 정도만 보라색 염료로 추출되어 사용되었기 때문에 고대부터 보라색은 왕족과 귀족만 쓰는 royal purple이라 불렸다. 20세게 중반까지는 살충제, 소독제, 정신병 치료제, 소화기 등에 널리 사용되었는데, 오존층을 파괴한다는 사실이 밝혀지면서 사용이 금지되었다.  필름 사진을 현상할 때 쓰는 감광제가 AgBr 즉 브로민화은 화합물이라서, 인기 배우 등의 커다란 포스터를 영어로 '브로마이드'(브로민화물)라고 부른다. 진공 상태의 전구 안에 브로민이나 아이오딘을 넣은 할로젠 램프로도 사용된다.");
  n++;
  elements[36] = new Element(36,"Kr","Krypton","크립톤",18, 4, nm_ng, [2,8,18,8,0,0,0], gas, ": ");
  n++;
  elements[37] = new Element(37,"Rb","Rubidium","루비듐",1, 5, m_al, [2,8,18,8,1,0,0],  solid, "루비듐은 분제 버너를 이용한 불꽃 반응을 분광기로 관찰하여 최초로 발견된 원소로 불꽃 반응의 붉은색을 뜻하는 라틴어(rubidus)로 이름을 지었다. 루비듐 원자 시계는 , 세슘 원자 시계보다 정밀도는 떨어지지만(그래도 30만년에 1초 오차, 세슘은 3000만년에 1초 오차) 저렴하고 소형화하기 쉬워 통신 장비와 위성, GPS 등에서 사용되는 원자 시계이다. ");
  n++;
  elements[38] = new Element(38,"Sr","Strontium","스트론튬",2, 5, m_ae, [2,8,18,8,2,0,0],  solid,  ": ");
  n++;
  elements[39] = new Element(39,"Y","Yttrium","이트륨",3, 5, m_tr, [2,8,18,9,2,0,0],  solid, ": ");
  n++;
  elements[40] = new Element(40,"Zr","Zirconium","지르코늄",4, 5, m_tr, [2,8,18,10,2,0,0],  solid, ": ");
  n++;
  elements[41] = new Element(41,"Nb","Niobium","나이오븀 / 니오븀",5, 5, m_tr, [2,8,18,12,1,0,0],  solid,  ": ");
  n++;
  elements[42] = new Element(42,"Mo","Molybdenum","몰리브데넘",6, 5, m_tr, [2,8,18,13,1,0,0],  solid, ": ");
  n++;
  elements[43] = new Element(43,"Tc","Technetium","테크네튬",7, 5, m_tr, [2,8,18,13,2,0,0],  solid,  ": ");
  n++;
  elements[44] = new Element(44,"Ru","Ruthenium","루테늄",8, 5, m_tr, [2,8,18,15,1,0,0], solid,  ": ");
  n++;
  elements[45] = new Element(45,"Rh","Rhodium","로듐",9, 5, m_tr, [2,8,18,16,1,0,0], solid, "로듐은 단단하면서도 무른 은백색의 금속으로, 녹는점이 높고, 산에 잘 녹지 않는 내식성과 내마모성도 뛰어나기 때문에 도금용으로 자주 이용된다. 은제품은 시간이 지나면 표면이 산화해 검은 녹이 생기는데 산화하지 않는 로듐을 은제품에 도금하면 늘 빛나는 은광택을 유지할 수 있게 된다. 로듐은 그램당 10만원 정도로 금보다 4배 비싸다. Apple USB-C-Lightning 케이블의 단자 도금용으로도 사용된다.");
  n++;
  elements[46] = new Element(46,"Pd","Palladium","팔라듐",10, 5, m_tr, [2,8,18,18,0,0,0], solid,  ": ");
  n++;
  elements[47] = new Element(47, "Ag", "Silver (Argentum)", "은", 11, 5, m_tr, [2,8,18,18,1,0,0],  solid, "모든 금속중 열전도도가 가장 좋고 전기전도도도 매우 뛰어난 금속. 세균, 박테리아 등을 박멸하는 항균성이 뛰어나서 나노입자 형태로 공기/물 정화, 섬유 등 항균 기능을 위해 사용된다.");
  n++;
  elements[48] = new Element(48, "Cd", "Cadmium", "카드뮴", 12, 5, m_tr, [2,8,18,18,2,0,0],  solid,  "1급 발암물질: 1910년 일본 진즈가와 유역에서 발생한 이타이이타이병(아파아파병)으로 수많은 농가 주민이 원인 모를 고통을 호소하다 뼈가 굽고 부서져 죽어 갔는데 나중에 근처 금속 광업 공장 폐수에 있던 카드뮴 때문이라는 사실이 밝혀진다. 카드뮴은 아연과 같은 족 원소라 성질이 비슷해서 우리 몸 안에서 아연의 자리를 차지하고 효소의 활동을 방해하는 것이다. 인체에는 매우 유해하지만 카드뮴 화합물은 페인트 도료나, 합금, 전지 등 첨단 산업 소재로 널리 쓰인다. 특히 CdS (황화카드뮴) 화합물은 조도센서와 양자점LED(QLED) 로 쓰인다.");
  n++;
  elements[49] = new Element(49, "In", "Indium", "인듐", 13, 5, m_pt, [2,8,18,18,3,0,0], solid,  "유해한 중금속인 카드뮴 양자점LED (Quantum Dot LED) 를 대채할 친환경적인 양자점LED 소재로 인화인듐(InP)이 사용된다.");
  n++;
  elements[50] = new Element(50, "Sn", "Tin (Stannum)", "주석", 14, 5, m_pt, [2,8,18,18,4,0,0], solid,  ": ");
  n++;
  elements[51] = new Element(51, "Sb", "Antimony (Stilbium)", "안티모니", 15, 5, ml, [2,8,18,18,5,0,0],  solid, ": ");
  n++;
  elements[52] = new Element(52, "Te", "Tellurium", "텔루륨", 16, 5, ml, [2,8,18,18,6,0,0],  solid,  ": ");
  n++;
  elements[53] = new Element(53, "I", "Iodine", "아이오딘/요오드", 17, 5, nm_ha, [2,8,18,18,7,0,0],  solid, "빨간 소독약(포비돈-아이오딘)으로도 유명한 아이오딘은 다른 17족(할로젠) 원소들 처럼 우수한 소독 효과를 가지고 있다. 미역, 김등의 해조료와 천일염등에 풍부한 아이오딘은 우리 몸의 갑상선 호르몬의 구성 원소이다. 아이오딘이 부족하면 목이 부풀어 오늘는 갑상선 비대증이 생기고 심하면 뇌까지 손상된다. 진공 상태의 전구 안에 브로민이나 아이오딘을 넣은 할로젠 램프로도 사용된다.");
  n++;
  elements[54] = new Element(54, "Xe", "Xenon", "제논 / 크세논", 18, 5, nm_ng, [2,8,18,18,8,0,0], gas, ": ");
  n++;
    elements[55] = new Element(55, "Cs", "Caesium", "세슘", 1, 6, m_al,[2,8,18,18,8,1,0], solid,  "1초는 바닥상태의 세슘-133 원자에서 방출된 빛이 9,192,631,770번 진동하는데 걸린 시간으로 1967년 국제기준으로 정해졌다. 따라서 세계 표준시에 맞추기 위해 각 나라는 세슘 원자시계를 가지고 있다. 우리도 한국표준과학연구원 KRISS이 세슘 원자시계를 관리한다. 세슘은 약 30종의 동위원소가 있는데, 이중 세슘-137은 방사성 붕괴를 하면 감마선을 방출하는 방사성 동위원소인데, 자연계에 존재하지않고 핵 발전이나 핵폭발에 의해서만 발생하므로 방사능 유출 사고를 탐지하는 지표로 활용된다. 또한 최초로 핵 실험을 한 1945년 이전에는 세슘-137이 존재하지 않았기 때문에 오래된 포도주의 제작 연도를 검사하는 지표로도 사용한다.");
  n++;
  elements[56] = new Element(56, "Ba", "Barium", "바륨", 2, 6, m_ae, [2,8,18,18,8,2,0],  solid, "희고 걸쭉한 황산바륨 화합물은 엑스선을 잘 흡수하고, 먹어도 소화 효소에 의해 분해되지 않아서 위장 엑스선 진단을 할 때 조영제(명암효과를 강화하는 물질)로 사용된다. 황산바륨을 제외한 다른 모든 바륨 화합물들은 독성이 있지만 산업적으로는 쓸모가 많다. 탄산바륨은 유리제조, 도자기 유약 등으로 사용되고, 염화바륨은 쥐약으로, 질산 바륨은 폭죽의 녹색 불꽃을 내는데 사용된다.");
  n++;
  elements[57] = new Element(57, "La", "Lanthanum", "란타넘", 3, 6, m_la, [2,8,18,18,9,2,0],  solid, ": ");
  n++;
  elements[n] = new Element(58, "Ce", "Cerium", "세륨", 3, 6, m_la, [2,8,18,19,9,2,0],  solid, ": ");
  n++;
  elements[n] = new Element(59, "Pr", "Praseodymium", "프라세오디뮴", 3, 6, m_la, [2,8,18,21,8,2,0],  solid, ": ");
  n++;
  elements[n] = new Element(60, "Nd", "Neodymium", "네오디뮴", 3, 6, m_la, [2,8,18,22,8,2,0],  solid, ": ");
  n++;
  elements[n] = new Element(61, "Pm", "Promethium", "프로메튬", 3, 6, m_la, [2,8,18,23,8,2,0], solid,  ": ");
  n++;
  elements[n] = new Element(62, "Sm", "Samarium", "사마륨", 3, 6, m_la, [2,8,18,24,8,2,0],  solid, ": ");
  n++;
  elements[n] = new Element(63, "Eu", "Europium", "유로퓸", 3, 6, m_la, [2,8,18,25,8,2,0], solid,  ": ");
  n++;
  elements[n] = new Element(64, "Gd", "Gadolinium", "가돌리늄", 3, 6, m_la, [2,8,18,25,9,2,0],  solid, ": ");
  n++;
  elements[n] = new Element(65, "Tb", "Terbium", "터븀", 3, 6, m_la, [2,8,18,27,8,2,0], solid,  ": ");
  n++;
  elements[n] = new Element(66, "Dy", "Dysprosium", "디스프로슘", 3, 6, m_la, [2,8,18,28,8,2,0], solid,  ": ");
  n++;
  elements[n] = new Element(67, "Ho", "Holmium", "홀륨", 3, 6, m_la, [2,8,18,29,8,2,0], ": ");
  n++;
  elements[n] = new Element(68, "Er", "Erbium", "어븀", 3, 6, m_la, [2,8,18,30,8,2,0],  solid, ": ");
  n++;
  elements[n] = new Element(69, "Tm", "Thulium", "툴륨", 3, 6, m_la, [2,8,18,31,8,2,0],  solid, ": ");
  n++;
  elements[n] = new Element(70, "Yb", "Ytterbium", "이터븀", 3, 6, m_la, [2,8,18,32,8,2,0],  solid, ": ");
  n++;
  elements[n] = new Element(71, "Lu", "Lutetium", "루테튬", 3, 6, m_la, [2,8,18,32,9,2,0],  solid, ": ");
  n++;
  elements[n] = new Element(72, "Hf", "Hafnium", "하프늄", 4, 6, m_tr, [2,8,18,32,10,2,0],  solid,  ": ");
  n++;
  elements[n] = new Element(73, "Ta", "Tantalum", "탄탈럼", 5, 6, m_tr, [2,8,18,32,11,2,0],  solid,  ": ");
  n++;
  elements[n] = new Element(74, "W", "Tungsten (Wolfram)", "텅스텐", 6, 6, m_tr, [2,8,18,32,12,2,0], ": ");
  n++;
  elements[n] = new Element(75, "Re", "Rhenium", "레늄", 7, 6, m_tr, [2,8,18,32,13,2,0], solid,  ": ");
  n++;
  elements[n] = new Element(76, "Os", "Osmium", "오스뮴", 8, 6, m_tr, [2,8,18,32,14,2,0], solid,  ": ");
  n++;
  elements[n] = new Element(77, "Ir", "Iridium", "이리듐", 9, 6, m_tr, [2,8,18,32,15,2,0],  solid, ": ");
  n++;  
  elements[n] = new Element(78, "Pt", "Platinum", "백금 / 플래티넘", 10, 6, m_tr, [2,8,18,32,17,1,0], solid,  ": ");
  n++;
  elements[n] = new Element(79, "Au", "Gold (Aurum)", "금", 11, 6, m_tr, [2,8,18,32,18,1,0],  solid, ": ");
  n++;
  elements[n] = new Element(80,"Hg","Mercury (Hydrargyrum)","수은",12,6, m_tr, [2,8,18,32,18,2,0], liquid, ": ");
  n++;
 elements[n] = new Element(81, "Tl", "Thallium", "탈륨", 13, 6, m_pt, [2,8,18,32,18,3,0],  solid, ": ");
  n++;  
  elements[n] = new Element(82, "Pb", "Lead (Plumbum)", "납", 14, 6, m_pt, [2,8,18,32,18,4,0],  solid, "녹는점(327도)이 낮고 무르고 가공하기 쉬워 고대부터 수도관, 식기 등 수많은 일상용품에 유용하게 사용된 금속. 20세기 중반에 납의 유독성과 중독 증상이 밝혀져 지금은 일상용품으로는 사용이 엄격하게 제한됨.");
  n++;
  elements[n] = new Element(83, "Bi", "Bismuth", "비스무트", 15, 6, m_pt, [2,8,18,32,18,5,0],  solid, ": ")
  n++;
  elements[n] = new Element(84, "Po", "Polonium", "폴로늄", 16, 6, ml, [2,8,18,32,18,6,0],  solid, "폴로늄은 118개 원소 중 가장 유독한 원소로, 청산가리보다 25만배 높은 독성을 띤다.2006년 러시아 연방보안국의 요원이 영국으로 망명한 뒤 계속해서 푸틴을 비당하다 암살당한 사건이 있는데, 이때 사체에서 많은 양의 폴로늄 동위원소 폴로늄-210이 발견되었다. 자연계에 존재하는 양이 매우 적어 우라늄에서 분리하거나 비스무트에 중성자를 충돌시켜서 만들어야 하는 폴로늄은 1 마이크로그램당 2억원이 넘는 비싼 원소이다.");
  n++;
  elements[n] = new Element(85, "At", "Astatine", "아스타틴", 17, 6, nm_ha, [2,8,18,32,18,7,0], ": ");
  n++;
  elements[n] = new Element(86, "Rn", "Radon", "라돈", 18, 6, nm_ng, [2,8,18,32,18,8,0], gas, ": ");
  n++;
  elements[n] = new Element(87, "Fr", "Francium", "프랑슘", 1, 7, m_al,[2,8,18,32,18,8,1],  solid, "프랑슘은 발견한 과학자의 국적 프랑스에서 이름이 유래된 원소로 자연계에는 거의 존재하지 않고 반감기가 최대 22분으로 너무 짧아서 활용할 수도 없는 원소이다.");
  n++;
  elements[n] = new Element(88, "Ra", "Radium", "라듐", 2, 7, m_ae, [2,8,18,32,18,8,2],  solid, ": ");
  n++;
  elements[n] = new Element(89, "Ac", "Actinium", "악티늄", 3, 7, m_ac, [2,8,18,32,18,9,2], solid,  ": ");
  n++;
  elements[n] = new Element(90, "Th", "Thorium", "토륨", 3, 7, m_ac, [2,8,18,32,18,10,2],  solid, ": ");
  n++;
  elements[n] = new Element(91, "Pa", "Protactinium", "프로트악티늄", 3, 7, m_ac, [2,8,18,32,20,9,2],  solid, ": ");
  n++;
  elements[n] = new Element(92, "U", "Uranium", "우라늄", 3, 7, m_ac, [2,8,18,32,21,9,2],  solid, ": ");
  n++;
  elements[n] = new Element(93, "Np", "Neptunium", "넵투늄", 3, 7, m_ac, [2,8,18,32,22,9,2], solid,  ": ");
  n++;
  elements[n] = new Element(94, "Pu", "Plutonium", "플루토늄", 3, 7, m_ac, [2,8,18,32,24,8,2],  solid, ": ");
  n++;
  elements[n] = new Element(95, "Am", "Americium", "아메리슘", 3, 7,  m_ac, [2,8,18,32,25,8,2],  solid, ": ");
  n++;
  elements[n] = new Element(96, "Cm", "Curium", "퀴륨", 3, 7, m_ac, [2,8,18,32,25,9,2], solid,  ": ");
  n++;
  elements[n] = new Element(97, "Bk", "Berkelium", "버클륨", 3, 7, m_ac,[2,8,18,32,27,8,2],  solid,  ": ");
  n++;
  elements[n] = new Element(98, "Cf", "Californium", "캘리포늄", 3, 7, m_ac, [2,8,18,32,28,8,2],  solid, ": ");
  n++;
  elements[n] = new Element(99, "Es", "Einsteinium", "아인슈타이늄", 3, 7, m_ac, [2,8,18,32,29,8,2],  solid, ": ");
  n++;
  elements[n] = new Element(100, "Fm", "Fermium", "페르뮴", 3, 7, m_ac,[2,8,18,32,30,8,2],  solid,  ": ");
  n++;
  elements[n] = new Element(101, "Md", "Mendelevium", "멘델레븀", 3, 7, m_ac, [2,8,18,32,31,8,2], solid,  ": ");
  n++;
  elements[n] = new Element(102, "No", "Nobellium", "노벨륨", 3, 7, m_ac, [2,8,18,32,32,8,2],  solid, ": ");
  n++;
  elements[n] = new Element(103, "Lr", "Lawrencium", "로렌슘", 3, 7, m_ac, [2,8,18,32,32,8,3], solid,  ": ");
  n++;
  elements[n] = new Element(104, "Rf", "Rutherfordium", "러더포듐", 4, 7, m_tr, [2,8,18,32,32,10,2],  solid, ": ");
  n++;
  elements[n] = new Element(105, "Db", "Dubnium", "더브늄", 5, 7, m_tr, [2,8,18,32,32,11,2],  solid, ": ");
  n++;
  elements[n] = new Element(106, "Sg", "Seaborgium", "시보귬", 6, 7, m_tr, [2,8,18,32,32,12,2],  solid, ": ");
  n++;
  elements[n] = new Element(107, "Bh", "Bohrium", "보륨", 7, 7, m_tr, [2,8,18,32,32,13,2],  solid, ": ");
  n++;
  elements[n] = new Element(108, "Hs", "Hassium", "하슘", 8, 7, m_tr, [2,8,18,32,32,14,2], solid,  ": ");
  n++;
  elements[n] = new Element(109, "Mt", "Meitnerium", "마이트너륨", 9, 7, m_tr,[2,8,18,32,32,15,2], solid,  ": ");
  n++;
  elements[n] = new Element(110, "Ds", "Darmstadtium", "다름슈타튬", 10, 7, m_tr, [2,8,18,32,32,16,2], solid,  ": ");
  n++;
  elements[n] = new Element(111, "Rg", "Roentgenium", "뢴트게늄", 11, 7, m_tr, [2,8,18,32,32,17,2], solid, ": ");
  n++;
  elements[n] = new Element(112, "Cn", "Copernicium", "코페르니슘", 12, 7, m_tr, [2,8,18,32,32,18,2], solid,  ": ");
  n++;
  elements[n] = new Element(113, "Nh", "Nihonium", "니호늄", 13, 7, m_pt, [2,8,18,32,32,18,3], solid,  ": ");
  n++;
  elements[n] = new Element(114, "Fl", "Flerovium", "플레로븀", 14, 7, m_pt, [2,8,18,32,32,18,4], solid,  ": ");
  n++;
  elements[n] = new Element(115, "Mc", "Moscovium", "모스코븀", 15, 7, m_pt, [2,8,18,32,32,18,5], ": ");
  n++;
  elements[n] = new Element(116, "Lv", "Livermorium", "리버모륨", 16, 7, m_pt, [2,8,18,32,32,18,6], solid,  ": ");
  n++;
  elements[n] = new Element(117, "Ts", "Tennessine", "테네신", 17, 7, nm_ha, [2,8,18,32,32,18,7], solid,  ": ");
  n++;
  elements[n] = new Element(118, "Og", "Oganesson", "오가네손", 18, 7, nm_ng, [2,8,18,32,32,18,8], solid,  ": ");
  n++;
  // label_la, m_la
  elements[n] = new Element(57, "-71", "Lanthanide", "란타넘족", 3, 6, label_la, [0,0,0,0,0,0,0], solid,  ": ");
  n++;
 elements[n] = new Element(89, "-103", "Actinide", "악티늄족", 3, 7, label_ac, [0,0,0,0,0,0,0], solid, ": ");
  n++;

}
