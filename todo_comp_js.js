$(loaded);

function loaded() {
  showText();

  // ボタンをクリックしたときに実行するイベントを設定する
  $("#formButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      saveText();
      showText();
    });

// [全クリア]ボタンを押したときの動作
$("#deleteButton").click(function(){
	swal({
	    title: "本当に消去しますか?",
	    text: "You will not be able to recover this imaginary file!",
	    type: "warning",
	    showCancelButton: true,
	    confirmButtonColor: "#DD6B55",
	    confirmButtonText: "Yes, delete it!",
	    cancelButtonText: "No, cancel !",
	    closeOnConfirm: false,
	    closeOnCancel: false
	},
    function (isConfirm) {
        if (isConfirm) {
            swal("Deleted!", "リストが消去されました", "success");
            localStorage.clear();
            $('#list').remove();
        }
        else { swal("Cancelled", "リストは削除されていません :)", "error"); }
    });
});

}
function ReloadAddr() {
    window.location.reload();	//ページをリロード
}


// 入力された内容をローカルストレージに保存する
function saveText() {
  // 時刻をキーにして入力されたテキストを保存する
  var text = $("#formText");
  var date = $("#date");
  var time = new Date();
  if(checkText(text.val()) && checkText(date)) { /* ローカルストレージに保存する処理 */
      var val = escapeText(text.val());
      var vala = escapeText(date.val());
      if (checkText(val) && checkText(vala)) {
          var datalist = {
              text: val,  //入力文
              date: vala,  //期限
          }
      localStorage.setItem(time, JSON.stringify(datalist));
  // テキストボックスを空にする
      text.val("");
      date.val("");
}
 }
}

// ローカルストレージに保存した値を再描画する
function showText() {
 
  // すでにある要素を削除する
  var list = $("#list")
  list.children().remove();
  // ローカルストレージに保存された値すべてを要素に追加する
  var html = Array();
  var box;
  box=sort();
  for (var i = 0, len = localStorage.length; i < len; i++) {
      html.push('<p>' + '<p style="border-left: 15px solid #9caeb7;padding: 7px;background: #d0dee5;">' + "&nbsp;&nbsp;" + "期限 :" + '<u>' + Math.floor(parseInt(box[i].date, 10) / 10000) + "-" + ('0' + Math.floor((parseInt(box[i].date, 10) % 10000) / 100)).slice(-2) + "-" + ('0' + (parseInt(box[i].date, 10) % 10000) % 100).slice(-2) + '</u>' + '</p>' + " " + '<h2 style="border-bottom: 1px solid #c85179;border-left: 10px solid #c85179;padding: 7px;">' + '<input id="cb" type="checkbox"> '  + "&nbsp" + box[i].value + '</label>'+'</h2>' + '</p>'+'<br>');
  }
   list.append(html.join(' '));
}

$(":checkbox").click(function () {

    if ($(this).is(":checked")) {
        $(this).closest("#list").css("text-decoration", "line-through");
    }
    else {
        $(this).closest("#list").css("text-decoration", "none");
    }

});

// 文字をエスケープする
function escapeText(text) {
  return $("<div>").text(text).html();
}

// 入力チェックを行う
function checkText(text) {
    if (0 === text.length || 30 < text.length) {
        swal("指示に従ってください");
    return false;}

  // すべてのチェックを通過できれば可
  return true;
}

// ローカルストレージ内のソート
var sort=function(){
var len=localStorage.length;
var box=Array();
for(var i=0;i<len;i++){
    var key = localStorage.key(i);
    var d = JSON.parse(localStorage.getItem(key));
    box[i]=new struct(key,d.text,d.date);
}

var flag=Boolean(false);
var k=0;

do{
flag=Boolean(false);

for(var i=0;i<len-1-k;i++){
  if(box[i].key<box[i+1].key){
	var tmp=box[i];
	box[i]=box[i+1];
	box[i+1]=tmp;

	flag=Boolean(true);
  }
}
k++;
}while(flag);

return box;
}

//入力でEnterが押されたとき
function go() {
    if (window.event.keyCode == 13) {
        saveText();
        showText();
    }
}


// 構造体もどき(keyとvalueとdate)
function struct(key, value, date) {
    this.key = key;
    this.value = value;
    this.date = date;
}

