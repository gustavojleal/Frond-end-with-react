import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newReposity = {
      title: 'novo titulo',
      url: 'https://blablabla.bla',
      techs: [ 'Oracle', 'JavaScript' ]
    };
    
    const response = await api.post('repositories', newReposity)
    setRepositories([ ...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    setRepositories(repositories.filter((repository) => repository.id !== id))
    return
  }

  return (
    <div>
      <ul data-testid="repository-list">
          
          { repositories.map( repository => 
           <li key={ repository.id }>
             { repository.title }
              <button onClick={ () => handleRemoveRepository( repository.id ) }>
                Remover
            </button>
           
           </li>)
          }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
