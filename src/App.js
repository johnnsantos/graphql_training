import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

export default function App() {
  const [page, setPage] = useState(1);

  const ALL_CHARACTERS = gql`
    {
      characters(page: ${page}
  ) {
        info {
          next
          prev
        }
        results {
          id
          name
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(ALL_CHARACTERS);

  const nextPage = () => {
    if (data.characters.info.next) {
      setPage(data.characters.info.next);
    }
  };
  const previousPage = () => {
    if (data.characters.info.prev) {
      setPage(data.characters.info.prev);
    }
  };

  if (loading)
    return (
      <div className="App">
        <p>Carregando</p>
      </div>
    );
  if (error)
    return (
      <div className="App">
        <p>Erro!</p>
      </div>
    );
  return (
    <div className="App">
      <h3>Personagens Rick Morty</h3>

      <ul>
        {data.characters.results.map((char, index) => (
          <li key={index}>{char.name}</li>
        ))}
      </ul>
      <div>
        <button onClick={previousPage}>Página anterior</button>
        <button onClick={nextPage}>Próxima página</button>
      </div>
    </div>
  );
}
