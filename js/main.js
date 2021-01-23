'use strict';
console.clear;
{
  const today = new Date();
  let year = today.getFullYear(); 
  let month = today.getMonth(); 

  function getCalendarHeard() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) { 
      dates.unshift({ 
        date: d - i,
        isToday: false, 
        isDisabled: true, 
      });
    }
    return dates;
  }

  function getCalendarBody() {
    const dates = []; 
    const lastDate = new Date(year, month + 1, 0).getDate();
                   
    for (let i = 1; i <= lastDate; i++) {
                    
      dates.push({
        date: i,    
        isToday: false, 
        isDisabled: false, 
    });
  }

    
  if (year === today.getFullYear() && month === today.getMonth()) {
    dates[today.getDate() - 1].isToday = true;
  }

    return dates;
  }

  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  function clearCalender() {
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) {  
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2,'0')}`; 
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      ...getCalendarHeard(),  
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];
    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7)); 
    }

  
    weeks.forEach(week => { 
      const tr = document.createElement('tr'); 
      week.forEach(date => { 
        const td = document.createElement('td'); 
        td.textContent = date.date;

        if (date.isToday) { 
          td.classList.add('today');
        }
        if (date.isDisabled) { 
          td.classList.add('disabled');
        }
      
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  function createCalender() {
    clearCalender();
    renderTitle();
    renderWeeks();
  }
  
  document.getElementById('prev').addEventListener('click', () => {

    month--;
    if (month < 0) { 
      year--;
      month = 11;
    }

    createCalender();
  });

  document.getElementById('next').addEventListener('click', () => {
    month++;  
    if (month > 11) {
      year++;
      month = 0; 
    }

    createCalender();
  });

  document.getElementById('today').addEventListener('click', () => {
      year = today.getFullYear();
      month = today.getMonth(); 
    

    createCalender();
  });

  createCalender();
}

// console.clear;
// {
//   let year = 2020; //yearとmonthはconstではなくletとする
//   let month = 4; //5月

//   function getCalendarHeard() {
//     const dates = [];
//     const d = new Date(year, month, 0).getDate();
//     const n = new Date(year, month, 1).getDay();


// dから1日ずつさかのぼりつつn日分の日付が欲しいのでループを回す。n回回せば良いので下記のようにする。
//     for (let i = 0; i < n; i++) { 
//       30
//       29,30
//       28,29,30
//       あとはdからさかのぼって日付を入れたいので、ループを回すたびに[30][29,30][28,29,30]といった具合に先頭に数値を入れるため unshft()を使う。
//       //その上で30はdそのもの、29はd-1、28はd-2なのでd-iとしてやると良い。
//       dates.unshift({ //datesはオブジェクトの配列にしたので、他のプロパティも追加してやる
//         date: d - i,
//         isToday: false, //todayクラスを付けるかどうか。先月分なのでfalse
//         isDisabled: true, //薄くするかどうかだが、先月部分は薄くしたいのでtrue
//       });
//     }
//     return dates;
//   }

//   function getCalendarBody() {
//     const dates = []; //jsでは date: 日付, day:曜日となる。
//     const lastDate = new Date(year, month + 1, 0).getDate();
//                      //1日から末日までを指定する場合、末日は翌月の1日の1日前と言う意味で、翌月の0日目を指定することで、今月の末日を取得する事ができる。
//     for (let i = 1; i <= lastDate; i++) {
//                      //iが１から末日までとして、iを１つずつ増やしながら次の処理をするよう指示する。datesに追加していけばいいので、iをpush()していけばいい。
//      dates.push({
//      date: i,     //今日の日付がわかるように単純な日付の配列ではなく、オブジェクトの配列に
//                      //してあげる。
//      isToday: false, //プロパティは日付とし、isTodayプロパティはtodayクラスに付けるかどう
//                         //か真偽値で保持する。
//      isDisabled: false, //disabledクラスも翌月と前月用に作ったので、これを付けるかどうかも
//                           //真偽値でもっておく。今月分なので当然falseとなる。
//     });
//   }
//     return dates;
//   }

//   function getCalendarTail() {
//     const dates = [];
//     const lastDay = new Date(year, month + 1, 0).getDay();

//     for (let i = 1; i < 7 - lastDay; i++) {
//       dates.push({
//         date: i,
//         isToday: false,
//         isDisabled: true,
//       });
//     }

//     return dates;

//   }

//   function clearCalender() {
//     const tbody = document.querySelector('tbody');

//     while (tbody.firstChild) {  
//       tbody.removeChild(tbody.firstChild);
//     }
//   }

//   function renderTitle() {
//     const title = `${year}/${String(month + 1).padStart(2,'0')}`; 
//     document.getElementById('title').textContent = title;
//   }

//   function renderWeeks() {
//     const dates = [
//       ...getCalendarHeard(),  
//       ...getCalendarBody(),
//       ...getCalendarTail(),
//     ];
//     const weeks = [];
//     const weeksCount = dates.length / 7;

//     for (let i = 0; i < weeksCount; i++) {
//       weeks.push(dates.splice(0, 7)); 
//     }

  
//     weeks.forEach(week => { 
//       const tr = document.createElement('tr'); 
//       week.forEach(date => { 
//         const td = document.createElement('td'); 
//         td.textContent = date.date;

//         if (date.isToday) { 
//           td.classList.add('today');
//         }
//         if (date.isDisabled) { 
//           td.classList.add('disabled');
//         }
      
//         tr.appendChild(td);
//       });
//       document.querySelector('tbody').appendChild(tr);
//     });
//   }

//   function createCalender() {
//     clearCalender();
//     renderTitle();
//     renderWeeks();
//   }
//     const tbody = document.querySelector('tbody');//クリックする度にカレンダーが追加されるのを修正する。createCalender()するたびにtbodyの中身をクリアしてあげる。まず、tbodyを取得。

//     while (tbody.firstChild) {  //tbodyの最初の子要素がある限り、tbodyからその最初び子要素を削除してね、というテクニックがよく使われる。
//     tbody.removeChild(tbody.firstChild);
   

//     const title = `${year}/${String(month + 1).padStart(2,'0')}`; //月の部分も変わるように調整する。表示する文字列をtitleで作っていく。テンプレートリテラルを使ってyearとmonthを表示する。月が一桁の時は最初に０を付けてやる。padStart()関数 (文字列にしか使えないのでstring()で一旦文字列にしてから使う)

//     document.getElementById('title').textContent = title; //その上で要素にはtitleというidを振ったので、getElementById()で取得し、textContentプロパティをtitleにしてあげるといい。
//     monthは０から始るので、表示する時には１を足す。
//     const dates = [
//     ...getCalendarHeard(),  //スプレット構文(...)を使ってやることにより全ての要素を１つの配列の中で展開する事ができる。
//     ...getCalendarBody(),
//     ...getCalendarTail(),
//     ];
//     const weeks = [];
//     const weeksCount = dates.length / 7;

//     for (let i = 0; i < weeksCount; i++) {
//     weeks.push(dates.splice(0, 7)); //先頭から７個分を削除しつつ取り出す指示
//     }

//     weeksを使ってHTMLの方に描画していく方法
//     weeks.forEach(week => { //週ごとに処理するためforEach()を回す
//     const tr = document.createElement('tr'); //取り出した配列をweekとしつつ、次の処理をするように書いてやる。weekごとに行を作って行きたいので、まずはtr要素をdocument.createElement()を使って作成する。
//     week.forEach(date => { //その上でweekに対してforEach()を回していく。取り出した要素をdateとしつつ、次の処理をするよう書いてやる。
//     const td = document.createElement('td'); //まずはtd要素を作る。
//     td.textContent = date.date;//その上でtextContentプロパティをdateのdateプロパティにしてあげれば日付が入る。

//     isTodayプロパティ、isDisabledプロパティに応じてクラスを付けていく
//     if (date.isToday) { //isTodayプロパティがtrueだったらtodayクラスを付ける
//        td.classList.add('today');
//     }
//     if (date.isDisabled) { //isDisabledプロパティがtrueだったらdisabledクラスを付ける
//        td.classList.add('disabled');
//     }
//     これでtd要素ができたので、tr要素の末尾に追加してあげるとよい
//     tr.appendChild(td);
//     });
//     あとはweekを処理したら、作ったtrをtbodyに追加していけばいいのでtodayを取得した後にappendChild()を使ってtrを追加する。
//     document.querySelector('tbody').appendChild(tr);
//     });


//   クリックしたら前月に移動するようにする処理
//   方法-クリックすると月を1引いてあげて、カレンダーを再描画するとよい
//   まずgetElementById(''prev)としてあげてEventListener()を追加する。そしてクリックすると次の処理をしてねと書いてあげる
//   document.getElementById('prev').addEventListener('click', () => {
//     monthから１引いてカレンダーを描画すれば良いが、年をまたぐ場合はyearの方も操作する
//     month--;
//     if (month < 0) { //月は０から始まるので注意！０より小さくなったらyearから1引いて12月に戻したいのだが０から始まるので１１とする必要がある。
//       year--;
//       month = 11;
//     }

//     createCalender();
//   });

//   nextの方も書く(次の月)
//   document.getElementById('next').addEventListener('click', () => {
//     month++;  //monthを１増やしてあげて、12月を超えたら（11より大きくなったら）と書く
//     if (month > 11) {
//       year++;
//       month = 0;  //年を一つ大きくして1月に戻すには０にしてあげると良い。
//     }

//     createCalender();

//   });

//   createCalender();
// }

// 定数には代入できないので最初の部分をconstではなくletにしなければならない！