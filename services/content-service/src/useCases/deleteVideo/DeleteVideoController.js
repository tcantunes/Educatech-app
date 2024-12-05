class DeleteVideoController {
    constructor(deleteVideoUseCase) {
      this.deleteVideoUseCase = deleteVideoUseCase;
    }
  
    async handle(req, res) {
      try {
        await this.deleteVideoUseCase.execute(req.params.id);
        res.status(200).json({ message: 'Vídeo removido com sucesso!' });
      } catch (error) {
        res.status(500).json({ error: 'Erro ao remover vídeo' });
      }
    }
  }
  
  module.exports = DeleteVideoController;
  