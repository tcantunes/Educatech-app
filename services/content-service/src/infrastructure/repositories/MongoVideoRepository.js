const Video = require('../../domain/entities/Video');
const VideoModel = require('../../domain/models/VideoModel');
const VideoRepository = require('../../domain/repositories/VideoRepository');

class MongoVideoRepository extends VideoRepository {
  async addVideo(videoData) {
    const video = new Video(videoData);
    return await VideoModel.create(video);
  }

  async getVideosByCategory(category) {
    return await VideoModel.find({ category });
  }

  async deleteVideoById(id) {
    return await VideoModel.findByIdAndDelete(id);
  }
}

module.exports = MongoVideoRepository;
