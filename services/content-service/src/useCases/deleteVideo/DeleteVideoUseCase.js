class DeleteVideoUseCase {
    constructor(videoRepository) {
      this.videoRepository = videoRepository;
    }
  
    async execute(id) {
      return await this.videoRepository.deleteVideoById(id);
    }
  }
  
  module.exports = DeleteVideoUseCase;
  