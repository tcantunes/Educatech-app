class GetVideosByCategoryUseCase {
    constructor(videoRepository) {
      this.videoRepository = videoRepository;
    }
  
    async execute(category) {
      return await this.videoRepository.getVideosByCategory(category);
    }
  }
  
  module.exports = GetVideosByCategoryUseCase;
  