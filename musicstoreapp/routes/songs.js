
module.exports = function (app, songsRepository) {

    app.get('/songs/add', function (req, res) {
        res.render("add.twig");
    });

    app.post('/songs/add', function (req, res) {
        let song = {
            title: req.body.title,
            kind: req.body.kind,
            price: req.body.price
        };
        //no me estaba funcionando con el código del guion
        songsRepository.insertSong(song, function(result){
            if(result !== null && result !== undefined && result.error === undefined) {
                res.send("Agregada la canción ID: " + result);
            } else {
                res.send("Error al insertar canción: " + result.error);
            }
        });
    });


    app.get('/songs/:id', function(req, res) {
        let response = 'id: ' + req.params.id;
        res.send(response);
    });
    app.get('/songs/:kind/:id', function(req, res) {
        let response = 'id: ' + req.params.id + '<br>'
            + 'Tipo de música: ' + req.params.kind;
        res.send(response);
    });
    // app.post('/songs/add', function(req, res){
    //    let response = "Canción agregada: " + req.body.title + "<br>"
    //    + " género:" + req.body.kind + "<br>"
    //     + " precio: " + req.body.price
    //
    //     res.send(response);
    // });
    app.get('/promo*', function (req, res) {
        res.send('Respuesta al patrón promo*');
    });
    app.get('/pro*ar', function (req, res) {
        res.send('Respuesta al patrón pro*ar');
    });
    app.get("/songs", function(req, res){
        let songs=[{
            "title": "Blank space",
            "price": "1.2"
        }, {
            "title": "See you again",
            "price": "1.3"
        }, {
            "title": "Uptown Funk",
            "price": "1.1"
        }];

        let response = {
            seller: 'Tienda de canciones',
            songs:songs
        };
        res.render("shop.twig", response)
    });



};



