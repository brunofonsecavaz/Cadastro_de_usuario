import { useEffect, useState, useRef } from 'react' // Importando hooks do React
import './style.css'
import Trash from '../../assets/react.svg'
import Api from '../../services/api'

function Home() {

  const [users, setUsers] = useState([]) // armazenar os usuarios e atualiza a lista em tempo real

  // Referências para os inputs, onde sera guardado os dados digitrado pelo usuario
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()
  const [editUserId, setEditUserId] = useState(null)

  // Função para preencher o formulário com os dados do usuario selecionado para editar
  function fillForm(user) {
    inputName.current.value = user.name
    inputAge.current.value = user.age
    inputEmail.current.value = user.email
    setEditUserId(user.id)
  }

  // Função para limpar os inputs após editar os usuarios
  function clearInputs() {
    inputName.current.value = ''
    inputAge.current.value = ''
    inputEmail.current.value = ''
  }

  // Função para editar um usuário
  async function editUser() {
    await Api.put(`/usuarios/${editUserId}`, {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    // Após editar, limpa os inputs e atualiza a lista de usuários
    setEditUserId(null)
    clearInputs()
    getUsers()
  }

  // Função para buscar usuários da API
  async function getUsers() {
    const usersFromApi = await Api.get('/usuarios') //estrutura para buscar usuarios 
    setUsers(usersFromApi.data) // mostra na pagina as infromações dos usuarios cadastrados
  }

  // Função para enviar os dados do usuário para a API
  async function createUsers() {
    await Api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  // Função para deletar um usuário
  async function deleteUsers(id) {
    await Api.delete(`/usuarios/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers() // chama a função para buscar usuários ao carregar o componente
  }, [])

  return (
    <div className="container">

      <form>
        <h1>Cadastro de Usuário</h1>
        <input placeholder='Nome:' name='nome' type='text' ref={inputName} />
        <input placeholder='Idade:' name='idade' type='number' ref={inputAge} />
        <input placeholder='E-mail:' name='email' type='email' ref={inputEmail} />
        {editUserId ? (
          <button onClick={editUser}>Salvar edição</button>
        ) : (
          <button onClick={createUsers}>Cadastrar</button>
        )}

      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>

          <div>
            <p>Nome:  <span>{user.name}</span> </p>
            <p>Idade: <span>{user.age}</span> </p>
            <p>Email: <span>{user.email}</span> </p>
          </div>

          <div className="actions">
            <button onClick={() => deleteUsers(user.id)} className="btnDelete">
              <img src={Trash} alt="Apagar" />
              <span>Apagar</span>
            </button>

            <button onClick={() => fillForm(user)} className="btnEdit">
              Editar
            </button>
          </div>

        </div>

      ))}
    </div>
  )
}

export default Home
