module.exports = function (app) {

    //  a)
    app.get('/authors/add', function (req, res) {
        // lista de roles para el complementario2
        let roles = ["cantante", "trompetista", "violinista", "saxofonista", "pianista"];
        let response = {
            seller: 'Tipos',
            roles: roles
        };
        res.render("authors/add.twig", response);
    });

    //  b)
    app.post('/authors/add', function(req, res){
        // si existe, se queda con el nombre, sino sale como no enviado
        let name = req.body.name ? req.body.name : 'no enviado en la petición';
        let group = req.body.group ? req.body.group : 'no enviado en la petición';
        let rol = req.body.rol ? req.body.rol : 'no enviado en la petición';

        let response = "Autor agregado: " + name + "<br>" +
            " grupo: " + group + "<br>" +
            " rol: " + rol;

        res.send(response);
    });

    //  c)
    app.get("/authors", function(req, res){
        let authors=[{
            "name": "Paco",
            "group": "Gritando en silencio",
            "rol": "saxofonista"
        }, {
            "name": "Arnau",
            "group": "Arnau Griso",
            "rol": "cantante"
        }, {
            "name": "Leire",
            "group": "La oreja de Van Gogh",
            "rol": "cantante"
        }, {
            "name": "Paula",
            "group": "El sueño de morfeo",
            "rol": "pianista"
        }, {
            "name": "Juan",
            "group": "Amaral",
            "rol": "trompetista"
        }];

        let response = {
            seller: 'Autores',
            authors: authors
        };
        res.render("authors/authors.twig", response)
    });


    //  complementario 3 (creo que es necesario ponerlo antes del comodín)
    app.get('/authors/filter/:rol', function (req, res) {
        let authors=[{
            "name": "Paco",
            "group": "Gritando en silencio",
            "rol": "saxofonista"
        }, {
            "name": "Arnau",
            "group": "Arnau Griso",
            "rol": "cantante"
        }, {
            "name": "Leire",
            "group": "La oreja de Van Gogh",
            "rol": "cantante"
        }, {
            "name": "Paula",
            "group": "El sueño de morfeo",
            "rol": "pianista"
        }, {
            "name": "Juan",
            "group": "Amaral",
            "rol": "trompetista"
        }];

        let result = [];
        for (let i = 0; i < authors.length; i++) {
            if (authors[i].rol === req.params.rol) {
                result.push(authors[i]);
            }
        }

        let response = {
            seller: 'Autores',
            authors: result
        };

        res.render("authors/authors.twig", response);
    });

    //  d)
    app.get('/autho*', function (req, res) {
        res.redirect("authors");
    });



};