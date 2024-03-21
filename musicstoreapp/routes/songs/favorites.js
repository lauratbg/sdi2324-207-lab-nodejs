const {ObjectId} = require("mongodb");
module.exports = function (app, songsRepository, favoriteSongsRepository) {
    app.get('/songs/favorites', async function (req, res) {
        if (req.session.user == null) {
            res.redirect("/users/login");
            return;
        }
        let filter = {};
        let options = {sort: {title: 1}};
        try {
            const favorites = await favoriteSongsRepository.getFavoritas(filter, options);

            if (favorites.length === 0) {
                res.render("No hay canciones favortitas en este momento")
            }

            const totalPrice = favorites.reduce((acc, song) => acc + parseFloat(song.price), 0);

            const response = {
                seller: 'Favoritos',
                favorites: favorites,
                total: totalPrice
            };

            res.render("songs/favorites", response);
        } catch (error) {
            res.send("Error al obtener los favoritos")
        }
    });


    app.post('/songs/favorites/add/:song_id', function (req, res) {
        let filter = {_id: new ObjectId(req.params.song_id)};
        let options = {};

        if (req.session.user == null) {
            res.redirect("/users/login");
            return;
        }

        songsRepository.findSong(filter, options).then(song => {
            let fav = {
                song_id: req.body.song_id,
                date: new Date(Date.now()).toLocaleDateString(),
                price: song.price,
                title: song.title,
                user: req.session.user
            }
            favoriteSongsRepository.insertFavorite(fav).then(song => {
                res.redirect("/songs/favorites");
            }).catch(error => {
                res.send("Error al insertar la canción en favoritos");
            });
        }).catch(error => {
            res.send("Se ha producido un error al buscar la canción " + error)
        });

    });


    app.get('/songs/favorites/delete/:song_id', async function (req, res) {

        if (req.session.user == null) {
            res.redirect("/users/login");
            return;
        }
        try {
            const filter = {_id: new ObjectId(req.params.song_id)};
            const options = {};

            await favoriteSongsRepository.deleteFavorite(filter, options);

            res.redirect("/songs/favorites");
        } catch (error) {
            console.error("Error al eliminar la canción favorita:", error);
            res.send("Error al eliminar la canción favorita");
        }
    });


}