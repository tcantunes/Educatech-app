class AddVideoUseCase {
    constructor(videoRepository) {
      this.videoRepository = videoRepository;
    }
  
    async execute(videoData) {
      return await this.videoRepository.addVideo(videoData);
    }
  }
  
  module.exports = AddVideoUseCase;
  