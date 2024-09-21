console.log($("#name"))

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

$.ajaxSetup({
  beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
  }
});

function csrfSafeMethod(method) {
  // these methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/).test(method);
}


function downloadCSV() {
  // テーブル要素を取得
  const table = document.getElementById('table');

  // BOMを追加して、CSVデータを作成する
  let csvContent = "\uFEFF"; // BOMを追加（\uFEFF はUTF-8のBOM）
  table.querySelectorAll("tr").forEach(tr => {
    let row = [...tr.querySelectorAll("td, th")]
      .map(td => td.textContent.replace(/,/g, ""))  // カンマを除去
      .join(",");
    csvContent += row + "\r\n";
  });

  // ダウンロードリンクを作成
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "rakuten-scraping.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


