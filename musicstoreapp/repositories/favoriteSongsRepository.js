module.exports = {
    mongoClient: null,
    app: null,
    database: "musicStore",
    collectionName: "favorites",
    init: function (app, dbClient) {
        this.dbClient = dbClient;
        this.app = app;
    },
    insertFavorite: async function (song) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const favoritesCollection = database.collection(this.collectionName);
            const result = await favoritesCollection.insertOne(song);
            return result.insertedId;
        } catch (error) {
            throw (error);
        }
    },
    getFavoritas: async function (filter, options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const favoritesCollection = database.collection(this.collectionName);
            const songs = await favoritesCollection.find(filter, options).toArray();
            return songs;
        } catch (error) {
            throw (error);
        }
    },
    deleteFavorite: async function (filter, options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const favoritesCollection = database.collection(this.collectionName);


            await favoritesCollection.findOneAndDelete(filter, options);



        } catch (error) {
            throw error;
        }
    }




}