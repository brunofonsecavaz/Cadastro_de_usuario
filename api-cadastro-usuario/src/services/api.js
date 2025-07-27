import Axios from 'axios' // Importa o axios para fazer requisições HTTP

// Define a URL base para as requisições da API
const api = Axios.create({
  baseURL: 'http://localhost:3000'
})

export default api // exporta para fazer o uso no arquivo de rotas