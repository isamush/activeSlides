
var slideCnt = 0;
// 読み上げを実行する
function startRead(){
  // console.log("in startRead");
  slideCnt = 0;
  $('#sentence').val(slides[0][1]);
  $('#simg').attr('src',slides[0][0]);
  //console.log("out startRead");
  setTimeout(function() {read();}, 700);
}

function read(){
  // テキストエリアの文字列を取得
  var sentence = $('#sentence').val();

  // SpeechSynthesisUtterance のインスタンスを作成
  var utterance = new SpeechSynthesisUtterance(sentence);
  utterance.onstart = startUtterance;
  utterance.onend = endUtterance;
  utterance.onpause = pauseUtterance;
  utterance.onresume = resumeUtterance;

  // 読み上げを実行
  speechSynthesis.speak(utterance);
  }

// 一時停止/再開する
  function pause(){
  // 一時停止中なら
  if(speechSynthesis.paused){
    // 再開する
    speechSynthesis.resume();
  }else{
    // そうでなければ一時停止する
    speechSynthesis.pause();
  }
  }

// 読み上げを終了する
  function cancel(){
  // 発話中なら
  if(speechSynthesis.speaking){
    // 停止する
    speechSynthesis.cancel();
  }
  slideCnt = slides.length;
  $('#kaishi').prop('disabled', false);
  }

  // 発話が始まったときの処理
  function startUtterance(){
      $('#ichiji').html('一時停止');
      $('#ichiji').prop('disabled', false);
      $('#teishi').prop('disabled', false);
      $('#kaishi').prop('disabled', true);
  }

  // 発話が終わったときの処理
  function endUtterance(){
    slideCnt += 1;
    if (slideCnt < slides.length) {
      $('#simg').attr('src',slides[slideCnt][0]);
      setTimeout(
      function() {
          $('#sentence').val(slides[slideCnt][1]);
          //console.log("in endUtterance");
          read();}
          , 1000);
    } else {
      $('#ichiji').prop('disabled', true);
      $('#teishi').prop('disabled', true);
      $('#kaishi').prop('disabled', false);
    }
  }

  // 一時停止したときの処理
  function pauseUtterance(){
    $('#ichiji').html('再開');
  }

  // 再開したときの処理
  function resumeUtterance(){
      $('#ichiji').html('一時停止');
  }
