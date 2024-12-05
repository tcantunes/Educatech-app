const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tcanarcizo:123456789taina@videos.bwssp.mongodb.net/?retryWrites=true&w=majority&appName=videos', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("Conectado ao MongoDB"))
.catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

module.exports = mongoose;
