const express = require('express');
const MongoVideoRepository = require('./infrastructure/repositories/MongoVideoRepository');
const AddVideoUseCase = require('./useCases/addVideo/AddVideoUseCase');
const AddVideoController = require('./useCases/addVideo/AddVideoController');
const GetVideosByCategoryUseCase = require('./useCases/getVideosByCategory/GetVideosByCategoryUseCase');
const GetVideosByCategoryController = require('./useCases/getVideosByCategory/GetVideosByCategoryController');
const DeleteVideoUseCase = require('./useCases/deleteVideo/DeleteVideoUseCase');
const DeleteVideoController = require('./useCases/deleteVideo/DeleteVideoController');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors())

const videoRepository = new MongoVideoRepository();
const addVideoController = new AddVideoController(new AddVideoUseCase(videoRepository));
const getVideosByCategoryController = new GetVideosByCategoryController(new GetVideosByCategoryUseCase(videoRepository));
const deleteVideoController = new DeleteVideoController(new DeleteVideoUseCase(videoRepository));

app.post('/api/videos/add', (req, res) => addVideoController.handle(req, res));
app.get('/api/videos/:category', (req, res) => getVideosByCategoryController.handle(req, res));
app.delete('/api/videos/:id', (req, res) => deleteVideoController.handle(req, res));

app.listen(8080, () => console.log('Servidor rodando na porta 8080'));

module.exports = app;
