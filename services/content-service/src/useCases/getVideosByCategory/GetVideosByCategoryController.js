class GetVideosByCategoryController {
    constructor(getVideosByCategoryUseCase) {
      this.getVideosByCategoryUseCase = getVideosByCategoryUseCase;
    }
  
    async handle(req, res) {
      try {
        const videos = await this.getVideosByCategoryUseCase.execute(req.params.category);
        res.status(200).json(videos);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar vídeos' });
      }
    }
  }
  
  module.exports = GetVideosByCategoryController;
  