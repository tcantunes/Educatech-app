class AddVideoController {
    constructor(addVideoUseCase) {
      this.addVideoUseCase = addVideoUseCase;
    }
  
    async handle(req, res) {
      try {
        const video = await this.addVideoUseCase.execute(req.body);
        res.status(201).json(video);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar vídeo' });
      }
    }
  }
  
  module.exports = AddVideoController;
  