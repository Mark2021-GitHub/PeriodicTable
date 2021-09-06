<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />
  </head>
  <body>
    <h3>주기율표(Periodic Table) 118개의 원소 이름 듣고 따라하기</h3> 
    
    <dl>
      <dt id=dt1>*원소번호 [기호] 원소 이름 </dt>
    <dd id=dd1>*원소 특징 한마디</dd>
    </dl>
    
    <form>
      <input type="radio" id="en" name="nextLang" value="en">
         영어
      <input type="radio" id="ko" name="nextLang" value="ko" checked>
         한국어 
       <input type="radio" id="koDesc" name="nextLang" value="koDesc">
         한국어(설명 포함) 
       <input type="radio" id="mute" name="nextLang" value="mute">
        음성 끄기
      <br>
      <input type="checkbox" id="check1" /> 클릭할 때마다 영어/한국어 원소 이름 번갈아 듣기
      <input type="checkbox" id="check2" /> 마우스 위치의 원소 자동 표시
      <br>
    
      <input type="text" class="txt" value="Hydrogen"/>
      <button type="submit" id="play">듣기</button>
      <input type="button" id="playNext" value="차례로 듣기"/>
      <select name="voiceSelect" id="voice"></select>
       <label for="rate">음성 속도</label> 
      <input type="range" id="rate" name="voiceRate" min="0.1" max="1" step="0.1" />
    </form>
  
      
    <script src="sketch.js"></script>
  </body>
</html>
