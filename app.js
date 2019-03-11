const websocket = require('ws');

const wss = new websocket.Server({
    port: 3001
});
var clients = [];
var kullanicilar = [];

wss.on("connection", function connection(ws, req) {
    ws.on("message", function incoming(message) {
        var data = JSON.parse(message);
        switch (data.option) {
            case "nUser":
                {
                    yeniKullanici(ws, data);
                    break;
                }
            case "msg":
                {
                    yeniMesaj(data);
                    break;
                }

            default:
                gonder(ws, {
                    "option": "hata",
                    "body": "Böyle bir işlem mevcut değil..."
                });
                break;
        }

        console.log("Alınan mesaj : " + message);

    });

});

function gonder(ws, data) {
    ws.send(JSON.stringify(data));
}

function yeniKullanici(ws, data) {
    console.log("kullanıcı tanımlandı");
    clients.push({
        "user": data.user,
        "ws": ws
    });

    kullanicilar.push(data.user);

    for (var item of clients) {
        gonder(item.ws ,{
            "option": "userL",
            "users": kullanicilar
        });
    }
};

function yeniMesaj(data) {
    var {
        kimden,
        kime,
        msj,
        tarih
    } = data;
    console.log("--> " + kimden + " " + kime + " " + msj + " " + tarih);
    for (var item of clients) {
        gonder(item.ws,data);
        /*  gonder(item.ws, {
              "option": "msg",
              "kimden": kimden,
              "kime": "mahmut",
              "msj": "msg",
              "tarih": "bu gun"
          });*/
    }

}