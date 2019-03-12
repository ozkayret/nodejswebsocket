//function islemler() {};


window.addEventListener("load", () => {
    //var islem= new islemler();
    // var ws = new WebSocket("ws://echo.websocket.org/");,
    var ws = new WebSocket("ws://localhost:3001/");
    ws.onopen = function (event) {
        console.log("Bağlandı...");
    };
    ws.onclose = function (event) {
        console.log("Bağlantı keildi...");
    };

    ws.onmessage = function (event) {

        console.log(event.data);
        var veri = JSON.parse(event.data);
        if (veri.option == "userL") {
            //  islem.baglanN();
            $selection.innerHTML = '<option value="-- - ">---</option>';
            for (var i = 0; i < veri.users.length; i++) {
                var $option = document.createElement("option");
                $option.value = veri.users[i];
                $option.innerHTML = veri.users[i]
                $selection.appendChild($option);
            }

        } else if (veri.option == "msg" && veri.kimden != username) {
            var $mesajlar = document.getElementById("mesajlar");
            var $mesaj = document.createElement("div");
            $mesaj.classList.add("mesaj-container");
            $mesajlar.appendChild($mesaj);

            var $gelenMsj = document.createElement("div");
            $gelenMsj.classList.add("gelenMsj");
            $mesaj.appendChild($gelenMsj);
            var $Kspan = document.createElement("span");
            var $Mspan = document.createElement("span");
            var $tarih = document.createElement("span");
            $tarih.classList.add("msg-tarih");

            $gelenMsj.appendChild($Kspan);
            $gelenMsj.appendChild($Mspan);
            $gelenMsj.appendChild($tarih);

            $Kspan.innerHTML = veri.kimden + " : ";
            $Mspan.innerHTML = veri.msj;
            $tarih.innerHTML ="<br>"+ veri.tarih;
            $mesajlar.scrollTop = $mesajlar.scrollHeight;
        }
        //ws.close();
        // {"option":"select","user":["ozkan"]}
    };

    ws.onerror = function (event) {
        console.log("Hata : " + event.message);
    };

    var $textbox = document.getElementById("msg");
    var $gonder = document.getElementById("gonder");
    var $baglan = document.getElementById("baglan");
    var $info = document.getElementById("info");
    var $kapat = document.getElementById("kapat");
    var username;
    var $selection = document.getElementById("kime");
    var $mesajlar = document.getElementById("mesajlar");

    $gonder.addEventListener("click", () => {
        //console.log("%cRENGGARENK",'font-size:36px;color:red');
        var $msg = $textbox.value;
        var now = new Date();
        var dt = {
            "option": "msg",
            kimden: username,
            kime: "mahmut",
            msj: $msg,
            tarih: now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
        }
        ws.send(JSON.stringify(dt));

        console.log("Gonderilen : " + $msg);
        var $mesaj = document.createElement("div");
        $mesaj.classList.add("mesaj-container");
        $mesajlar.appendChild($mesaj);
        // $mesajlar.scrollTop = $mesajlar.scrollHeight;
        var $gidenMsj = document.createElement("div");
        $gidenMsj.classList.add("gidenMsj");
        $mesaj.appendChild($gidenMsj);

        var $Kspan = document.createElement("span");
        var $Mspan = document.createElement("span");
        var $tarih = document.createElement("span");
        $tarih.classList.add("msg-tarih");

        $gidenMsj.appendChild($Kspan);
        $gidenMsj.appendChild($Mspan);
        $gidenMsj.appendChild($tarih);

        $Kspan.innerHTML = "Ben : ";
        $Mspan.innerHTML = $msg;
        var now = new Date();
        $tarih.innerHTML = "<br>"+now.getHours() + ":" + now.getMinutes() + ":";// + now.getSeconds();
        $mesajlar.scrollTop = $mesajlar.scrollHeight;
    });

    $baglan.addEventListener("click", () => {
        username = document.getElementById("kisi").value;
        if (username) {
            $textbox.disabled = false;
            $kapat.disabled = false;
            $gonder.disabled = false;
            $baglan.disabled = true;
            $selection.disabled = false;
            document.getElementById("kisi").disabled = true;

            ws.send(JSON.stringify({
                "option": "nUser",
                "user": username
            }));

            // {"option":"select","user":["ozkan"]}



        } else {
            console.error("user name boş ");
        }
        $info.innerHTML = username + " kullanıcı adı ile bağlantı kuruldu...."
    });
    $kapat.addEventListener("click", () => {
        $textbox.disabled = true;
        $kapat.disabled = true;
        $gonder.disabled = true;
        $baglan.disabled = false;
        $selection.disabled = true;
        document.getElementById("kisi").disabled = false;
        ws.close();
        $info.innerHTML = "Bağlantı kapatıldı..."
    });

})
/*
islemler.prototype.listele = function (data) {

};*/