let elements = [];
let n = 1;
let x = 10;
let y = 15;
let w = 35;
let h = 35;
let atomx = 11*w;
let atomy = 3*h+10;


let m_al = 'Alkali metals';
let m_ae = 'Alkaline earth metals';
let m_tr = 'Transition metals';
let m_pt = 'Post-transition metals';
let label_la = 'Label:Lanthanide' // Label
let m_la = 'Lanthanide';
let label_ac = 'Label:Actinoid' // Label:  
let m_ac = 'Actinoid'

let ml = 'Metalloids';
let nm_re = 'Reactive nonmetals';
let nm_ha = 'Halogen';
let nm_ng = 'Nonmetals-Noble gases';



var inputForm = document.querySelector("form");
var inputTxt = document.querySelector(".txt");
var playNextBtton = document.getElementById("playNext");
var radioMute = document.getElementById("mute");
var radioEn = document.getElementById("en");
var radioKo = document.getElementById("ko");
var radioKodesc = document.getElementById("koDesc");
var bSwitch = document.getElementById("check1");
var dtText = document.getElementById("dt1");
var ddText = document.getElementById("dd1");


// for speechSynthesis;
var synth = window.speechSynthesis;
var voices = [];
let voiceSelect;
let pitchSlider;
let rateSlider;
let enVoice = [];
let kVoice = [];
let bVoice = false;
let next = 1 ;

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
    this.tsize = 15;
    this.str=" "+this.id +" ["+this.s +"] "+this.ename+" ("+this.kname+")";
    
    this.x = (this.px-1)*this.w+2*w;   
    this.y = (this.py-1)*this.h+3*h; 
      
    if(ptclass == m_la){
      this.x += (this.id - 56) * this.w;   
      this.y += this.h*3; 
    } else if(ptclass == m_ac){
      this.x += (this.id - 88) * this.w;   
      this.y += this.h*3; 
    } 
    
    this.shell = shell;
    
  }
  
  show(mx, my) {
    stroke(255);
    if (this.contains(mx, my)) {
      fill(0, 255, 0);
      rect(this.x, this.y, this.w, this.h);
      fill(255, 0, 0);
      dtText.innerText =  this.str;
      ddText.innerText = this.desc;
    } else {
      fill(200);
      rect(this.x, this.y, this.w, this.h);
      fill(0, 0, 255);
    }
    textSize(this.tsize);
    text(this.str,this.x,this.y + this.tsize);
  }
  
  showPT(mx, my) {
      fill(this.fillc);
      rect(this.x, this.y, this.w, this.h);
      textSize(15);
      fill(255);
      text(this.id,this.x+5,this.y + 12);
      textSize(15); 
      text(this.s,this.x+5,this.y + 30);
  
      if (this.contains(mx, my)) {
        showAtom(this.id, this.shell);
      }
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

let l = w*4+10;
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
  for(let s=0; s<7; s++) {
    let e = elements[id].shell[s]; 
    if( e == 0 ) {
      break;
    } 
    text(e,r-20, t+(s+1)*h/2);
  }
  textSize(20);
  text(elements[id].id,l+5, t+20);
  textSize(30);
  textStyle(BOLD);
  text(elements[id].s,l+5, t+50);
  textSize(15);
  textStyle(NORMAL);
  text(elements[id].kname,l+5, b-40);
  text(elements[id].ename,l+5, b-20);
  
  
}

function showAtom(id,shell){
  push();
  translate(atomx,atomy);
  fill(255);
  noStroke();
  circle(0,0,180); // atom's background
  
  fill(125);
  circle(0,0,20); // proton, neutron
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
    return color(150,0,0);
  } else if( ptclass == m_pt){
    return color(255,200,0);
  } else if( ptclass == m_la || ptclass == label_la){
    return color(150,100,100);
  } else if( ptclass == m_ac || ptclass == label_ac){
    return color(100,100,100);
  } else if( ptclass == ml){ 
    return color(0,150,200);
  } else if( ptclass == nm_re){
    return color(0,200,0);
  } else if( ptclass == nm_ha){
    return color(0,100,0);
  } else if( ptclass == nm_ng){
    return color(255,0,255);
  } 
}

function setup() {
  cnv = createCanvas(800, 480);
  
  setupVoices();
  setupElement();
  
}

let gy=h*10+20;

function showLabel() {
  
  // 1-18 Group Label
  textSize(10);
  fill(0);
  text("Group▲",w,gy-2)
  textSize(15);
  for( let g=1; g <=18; g ++) {
      text(g,g*w+5+w, gy );
  }
  
  // 1-7 Period Label
  textSize(10);
  fill(0);
  text("Period",w,3*h-12);
  text("▶︎",w,3*h);
  
  textSize(15);
  for( let p=1; p<=7; p ++) {
      text(p,w,(p+3)*h -5 );
  }
  
}

function draw() {
  background(220);
  //
  showLabel() ;
  for (let i = 1; i < n; i++) {
    elements[i].showPT(mouseX, mouseY);
  }
  noLoop();
}

playNextBtton.onclick = function (){
  playNext();
}

let isNext = false;

function playNext(){
  if(synth.speaking) {
   return;
  }
  
  let sel = voiceSelect.value();
  let str = splitTokens(sel, ':');
  let vnumber = Number(str[0]);
  
  dtText.innerText =  elements[next].str;
  ddText.innerText = elements[next].desc;
  showAtom(elements[next].id, elements[next].shell );
  showBox(next);
  
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

inputForm.onsubmit = function (event) {
  event.preventDefault();
  if(synth.speaking) {
    return;
  }
  
  let sel = voiceSelect.value();
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
    //synth.cancel();
    return;
  }
  if (txt !== "") {
    var ut = new SpeechSynthesisUtterance(txt);
   
    ut.voice = voices[vid];
    ut.pitch = pitchSlider.value();
    ut.rate = rateSlider.value();
    //ut.voiceURI = 'native';
    //ut.volume = 1;
    synth.speak(ut);
    ut.onboundary = function(event) {
     // console.log(event.name + ':' + event.elapsedTime);
    }
  }
}


function setupVoices(){
  let voicestr;
  let e=0;
  let k=0;
  let isDefault = false;
  let defaultVoice;
  
  voiceSelect = createSelect();
  voiceSelect.position(1, cnv.position().y + height+20);
  
  voices = synth.getVoices();
  for(var i = 0; i < voices.length; i++) {
    let str = i+":" + voices[i].name + "("+ voices[i].lang+")";
    voiceSelect.option(str);
    if(voices[i].lang == "en-US") {
      enVoice[e] = i;
      e ++;
      if(isDefault == false){
        defaultVoice = str;
        isDefault = true;
      }
    } else if( voices[i].lang == "ko-KR"){
      kVoice[k] = i;
      k++;
    }
  }  
  voiceSelect.selected(defaultVoice);
  voiceSelect.changed(changeVoice);
  
  rateSlider = createSlider(0.5, 1, 1, 0.1);
  rateSlider.position(1, voiceSelect.position().y+20);
  rateSlider.style('width', '140px');
  
  pitchSlider = createSlider(0, 2, 1, 0.1);
  pitchSlider.position(rateSlider.position().x + 150, rateSlider.position().y);
  pitchSlider.style('width', '140px');
  
  let div1 = createDiv('음성 속도 조절');
div1.style('font-size', '16px');
div1.position(rateSlider.position().x ,rateSlider.position().y +20 );
  let div2 = createDiv('음성 높이 조절');
div2.style('font-size', '16px');
div2.position(pitchSlider.position().x ,pitchSlider.position().y +20 );
  
}

function changeVoice(){
  let sel = voiceSelect.value();
  let str = splitTokens(sel, ':');
  let vnumber = Number(str[0]);
    
  textToSpeech(inputTxt.value, vnumber);
}

function mousePressed() {
  let sel = voiceSelect.value();
  let str = splitTokens(sel, ':');
  let vnumber = Number(str[0]);
 
  
  for (let i = 1; i < n; i++) {
    if (elements[i].contains(mouseX, mouseY)) {
      next = i;
      dtText.innerText = elements[next].str;
      ddText.innerText = elements[next].desc;
      showAtom(elements[next].id, elements[next].shell);
      showBox(next);
      
      if(radioMute.checked == true){
        return;
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
              //elements[i].speech(voices[vnumber].lang, vnumber);
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
}

function setupElement() {
  elements[1] = new Element(1, "H", "Hydrogen", "수소", 1, 1, nm_re, [1,0,0,0,0,0,0], ": 가장 가볍고 불에 타기 쉬운 기체");
  n++;
  elements[2] = new Element(2, "He", "Helium", "헬륨", 18, 1, nm_ng, [2,0,0,0,0,0,0], ": 풍선을 뜨게하는 가벼운 기체");
  n++;
  elements[3] = new Element(3, "Li", "Lithium", "리튬", 1, 2,  m_al, [2,1,0,0,0,0,0], ": 대용량, 고효율의 리튬이온 전지에 사용되는 가장 가벼운 금속");
  n++;
  elements[4] = new Element(4, "Be", "Beryllium", "베릴륨", 2, 2, m_ae, [2,2,0,0,0,0,0], ": 알루미늄보다 가볍고 강철보다 단단한 금속");
  n++;
  elements[5] = new Element(5, "B", "Boron", "붕소", 13, 2, ml, [2,3,0,0,0,0,0], ": 불에 타기 어려워 내열유리, 로켓 엔진 노즐등에 사용되는 반금속");
  n++;
  elements[6] = new Element(6, "C", "Carbon", "탄소", 14, 2, nm_re,[2,4,0,0,0,0,0], ": 다이아몬드, 연필심, 유기화합물을 이루는 생명의 원소");
  n++;
  elements[7] = new Element(7, "N", "Nitrogen", "질소", 15, 2,nm_re, [2,5,0,0,0,0,0], ": 공기의 78%를 차지하는 기체");
  n++;
  elements[8] = new Element(8, "O", "Oxygen", "산소", 16, 2,nm_re, [2,6,0,0,0,0,0],": 물질을 연소시키거나 산화시키는 기체");
  n++;
  elements[9] = new Element(9, "F", "Fluorine","플루오린/불소",17,2,nm_ha, [2,7,0,0,0,0,0], ": 조리 기구의 코팅제나 치약에 사용되는 반응성이 높은 기체");
  n++;
  elements[10] = new Element(10, "Ne", "Neon", "네온", 18, 2,nm_ng, [2,8,0,0,0,0,0], ": 전압을 가하면 붉게 빛나는 기체");
  n++;
  elements[11] = new Element(11,"Na","Sodium / Natrium","소듐/나트륨",1,3, m_al, [2,8,1,0,0,0,0], ": 바닷물 속 소금에 풍부하게 존재하는 무른 금속");
  n++;
  elements[12] = new Element(12,"Mg","Magnesium","마그네슘",2,3, m_ae, [2,8,2,0,0,0,0], ": 쉽게 불에 타면서 밝은 백색광을 내고, 경량,고강도의 첨단 합금 소재 금속");
  n++;
  elements[13] = new Element(13,"Al","Aluminium","알루미늄",13,3, m_pt, [2,8,3,0,0,0,0], ": 가볍고, 열 전도성이 좋아 다양한 합금 소재로 산업에서 널리 활용되는 금속");
  n++;
  elements[14] = new Element(14,"Si","Silicon","규소/실리콘",14,3, ml, [2,8,4,0,0,0,0], ": 지각에 산소 다음으로 풍부하게 존재하는 가장 저렴한 반도체");
  n++;
  elements[15] = new Element(15, "P", "Phosphorus", "인", 15, 3, nm_re, [2,8,5,0,0,0,0], ": 소변에서 추출되는 생체 화합물의 필수 원소인 비금속");
  n++;
  elements[16] = new Element(16, "S", "Sulfur", "황", 16, 3, nm_re, [2,8,6,0,0,0,0], ": 화산지대에서 직접 채굴 되는 노란색 비금속"); 
  n++;
  elements[17] = new Element(17, "Cl", "Chlorine", "염소", 17, 3, nm_ha, [2,8,7,0,0,0,0], ": 자극적인 냄새가 있는 황록색 기체");
  n++;
  elements[18] = new Element(18, "Ar", "Argon", "아르곤", 18, 3, nm_ng, [2,8,8,0,0,0,0], ": 반응성이 거의 없는 게으른 기체");
  n++;
  elements[19] = new Element(19, "K","Potassium / Kalium","포타슘/칼륨",1,4, m_al, [2,8,8,1,0,0,0],": 비료의 3대 요소중 하나로 물과 격렬하게 반응하는 무른 금속");
  n++;
  elements[20] = new Element(20, "Ca", "Calcium", "칼슘", 2, 4, m_ae, [2,8,8,2,0,0,0], ": 뼈와 치아의 주성분이 되는 금속");
  n++;
  elements[21] = new Element(21, "Sc", "Scandium", "스칸듐", 3, 4, m_tr, [2,8,9,2,0,0,0], ": 멘델레예프가 예언한 원소로 태양처럼 밝은 빛을 내는 희소 금속");
  n++;
  elements[22] = new Element(22, "Ti", "Titanium", "타이타늄", 4, 4, m_tr, [2,8,10,2,0,0,0], ": ");
  n++;
  elements[23] = new Element(23, "V", "Vanadium", "바나듐", 5, 4, m_tr, [2,8,11,2,0,0,0], ": ");
  n++;
  elements[24] = new Element(24, "Cr", "Chromium", "크로뮴", 6, 4, m_tr, [2,8,12,2,0,0,0], ": ");
  n++;
  elements[25] = new Element(25,"Mn","Manganese","망가니즈/망간", 7, 4, m_tr, [2,8,13,2,0,0,0], ": ");
  n++;
  elements[26] = new Element(26, "Fe", "Iron / Ferrum", "철", 8, 4, m_tr, [2,8,14,2,0,0,0],": ");
  n++;
 elements[27] = new Element(27, "Co", "Cobalt", "코발트", 9, 4, m_tr, [2,8,15,2,0,0,0], ": ");
  n++;
  elements[28] = new Element(28, "Ni", "Nickel", "니켈", 10, 4, m_tr, [2,8,16,2,0,0,0], ": ");
  n++;
  elements[29] = new Element(29,"Cu","Copper / Cuprum","구리",11,4, m_tr, [2,8,17,2,0,0,0], ": ");
  n++;
  elements[30] = new Element(30, "Zn", "Zinc", "아연", 12, 4, m_tr, [2,8,18,2,0,0,0], ": ");
  n++;
  elements[31] = new Element(31, "Ga", "Gallium", "갈륨", 13, 4, m_pt, [2,8,18,3,0,0,0], ": ");
   n++;
  elements[32] = new Element(32, "Ge", "Germanium", "저마늄/게르마늄", 14, 4, ml, [2,8,18,4,0,0,0], ": ");
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
  elements[41] = new Element(41,"Nb","Niobium","나이오븀/니오븀",5, 5, m_tr, [2,8,18,11,2,0,0],  ": ");
  n++;
  elements[42] = new Element(42,"Mo","Molybdenum","몰리브데넘",6, 5, m_tr, [2,8,18,12,2,0,0], ": ");
  n++;
  elements[43] = new Element(43,"Tc","Technetium","테크네튬",7, 5, m_tr, [2,8,18,13,2,0,0],  ": ");
  n++;
  elements[44] = new Element(44,"Ru","Ruthenium","루테늄",8, 5, m_tr, [2,8,18,14,2,0,0], ": ");
  n++;
  elements[45] = new Element(45,"Rh","Rhodium","로듐",9, 5, m_tr, [2,8,18,15,2,0,0], ": ");
  n++;
  elements[46] = new Element(46,"Pd","Palladium","팔라듐",10, 5, m_tr, [2,8,18,16,2,0,0], ": ");
  n++;
  elements[47] = new Element(47, "Ag", "Silver / Argentum", "은", 11, 5, m_tr, [2,8,18,17,2,0,0], ": ");
  n++;
  elements[48] = new Element(48, "Cd", "Cadmium", "카드뮴", 12, 5, m_tr, [2,8,18,18,2,0,0],  ": ");
  n++;
  elements[49] = new Element(49, "In", "Indium", "인듐", 13, 5, m_pt, [2,8,18,18,3,0,0], ": ");
  n++;
  elements[50] = new Element(50, "Sn", "Tin / Stannum", "주석", 14, 5, m_pt, [2,8,18,18,4,0,0], ": ");
  n++;
  elements[51] = new Element(51, "Sb", "Antimony / Stilbium", "안티모니", 15, 5, ml, [2,8,18,18,5,0,0], ": ");
  n++;
  elements[52] = new Element(52, "Ag", "Tellurium", "텔루륨", 16, 5, ml, [2,8,18,18,6,0,0],  ": ");
  n++;
  elements[53] = new Element(53, "I", "Iodine", "아이오딘/요오드", 17, 5, nm_ha, [2,8,18,18,7,0,0], ": ");
  n++;
  elements[54] = new Element(54, "Xe", "Xenon", "제논/크세논", 18, 5, nm_ng, [2,8,18,18,8,0,0], ": ");
  n++;
    elements[55] = new Element(55, "Cs", "Caesium", "세슘", 1, 6, m_al,[2,8,18,18,8,1,0], ": ");
  n++;
  elements[56] = new Element(56, "Ba", "Barium", "바륨", 2, 6, m_ae, [2,8,18,18,8,2,0], ": ");
  n++;
  elements[57] = new Element(57, "La", "Lanthanum", "란타넘", 3, 6, m_la, [2,8,18,19,8,2,0], ": ");
  n++;
  elements[n] = new Element(58, "Ce", "Cerium", "세륨", 3, 6, m_la, [2,8,18,20,8,2,0], ": ");
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
  elements[n] = new Element(64, "Gd", "Gadolinium", "가돌리늄", 3, 6, m_la, [2,8,18,26,8,2,0], ": ");
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
  elements[n] = new Element(74, "W", "Tungsten / Wolfram", "텅스텐", 6, 6, m_tr, [2,8,18,32,12,2,0], ": ");
  n++;
  elements[n] = new Element(75, "Re", "Rhenium", "레늄", 7, 6, m_tr, [2,8,18,32,13,2,0], ": ");
  n++;
  elements[n] = new Element(76, "Os", "Osmium", "오스뮴", 8, 6, m_tr, [2,8,18,32,14,2,0], ": ");
  n++;
  elements[n] = new Element(77, "Ir", "Iridium", "이리듐", 9, 6, m_tr, [2,8,18,32,15,2,0], ": ");
  n++;  
  elements[n] = new Element(78, "Pt", "Platinum", "백금/플래티넘", 10, 6, m_tr, [2,8,18,32,16,2,0], ": ");
  n++;
  elements[n] = new Element(79, "Au", "Gold / Aurum", "금", 11, 6, m_tr, [2,8,18,32,17,2,0], ": ");
  n++;
  elements[n] = new Element(80,"Hg","Mercury / Hydrargyrum","수은",12,6, m_tr, [2,8,18,32,18,2,0], ": ");
  n++;
 elements[n] = new Element(81, "Tl", "Thallium", "탈륨", 13, 6, m_pt, [2,8,18,32,18,3,0], ": ");
  n++;  
  elements[n] = new Element(82, "Pb", "Lead / Plumbum", "납", 14, 6, m_pt, [2,8,18,32,18,4,0], ": ");
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
  elements[n] = new Element(89, "Ac", "Actinium", "악티늄", 3, 7, m_ac, [2,8,18,32,19,8,2], ": ");
  n++;
  elements[n] = new Element(90, "Th", "Thorium", "토륨", 3, 7, m_ac, [2,8,18,32,20,8,2], ": ");
  n++;
  elements[n] = new Element(91, "Pa", "Protactinium", "프로트악티늄", 3, 7, m_ac, [2,8,18,32,21,8,2], ": ");
  n++;
  elements[n] = new Element(92, "U", "Uranium", "우라늄", 3, 7, m_ac, [2,8,18,32,22,8,2], ": ");
  n++;
  elements[n] = new Element(93, "Np", "Neptunium", "넵투늄", 3, 7, m_ac, [2,8,18,32,23,8,2], ": ");
  n++;
  elements[n] = new Element(94, "Pu", "Plutonium", "플루토늄", 3, 7, m_ac, [2,8,18,32,24,8,2], ": ");
  n++;
  elements[n] = new Element(95, "Am", "Americium", "아메리슘", 3, 7,  m_ac, [2,8,18,32,25,8,2], ": ");
  n++;
  elements[n] = new Element(96, "Cm", "Curium", "퀴륨", 3, 7, m_ac, [2,8,18,32,26,8,2], ": ");
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
  elements[n] = new Element(103, "Lr", "Lawrencium", "로렌슘", 3, 7, m_ac, [2,8,18,32,32,9,2], ": ");
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
  elements[n] = new Element(57, "-71", "Lanthanide", "란타넘족", 3, 6, label_la, [0,0,0,0,0,0,0], ": ");
  n++;
 elements[n] = new Element(89, "-103", "Actinide", "악티늄족", 3, 7, label_ac, [0,0,0,0,0,0,0], ": ");
  n++;

}
