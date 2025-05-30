// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const [destino, setDestino] = useState('Dublin');
  const [dataEntrada, setDataEntrada] = useState('2025-05-28');
  const [dataSaida, setDataSaida] = useState('2025-05-30');
  const [hospedes, setHospedes] = useState('2 Adultos, 0 Criança, 1 Quarto');
  const [showDestinoSuggestions, setShowDestinoSuggestions] = useState(false);
  const [showHospedesDropdown, setShowHospedesDropdown] = useState(false);
  const [adultos, setAdultos] = useState(2);
  const [criancas, setCriancas] = useState(0);
  const [quartos, setQuartos] = useState(1);

  // ATUALIZADO: Mais sugestões de destino
  const destinoSuggestions = [
    { name: 'Dublin', location: 'Irlanda' },
    { name: 'Berlim', location: 'Alemanha' },
    { name: 'Gramado', location: 'Brasil' },
    { name: 'Búzios', location: 'Brasil' },
    { name: 'Rio de Janeiro', location: 'Brasil' },
    { name: 'Campos do Jordão', location: 'Brasil' },
    { name: 'São Paulo', location: 'Brasil' },
    { name: 'Foz do Iguaçu', location: 'Brasil' },
    { name: 'Paris', location: 'França' },
    { name: 'Londres', location: 'Reino Unido' },
    { name: 'Roma', location: 'Itália' },
    { name: 'Nova York', location: 'EUA' },
    { name: 'Tóquio', location: 'Japão' },
    { name: 'Sydney', location: 'Austrália' },
    { name: 'Barcelona', location: 'Espanha' },
    { name: 'Cancun', location: 'México' },
    { name: 'Maldivas', location: 'Maldivas' },
    { name: 'Amsterdã', location: 'Holanda' },
    { name: 'Lisboa', location: 'Portugal' },
    { name: 'Praga', location: 'República Tcheca' },
    { name: 'Dubai', location: 'Emirados Árabes Unidos' },
    { name: 'Bangkok', location: 'Tailândia' },
    { name: 'Cidade do Cabo', location: 'África do Sul' },
    { name: 'Vancouver', location: 'Canadá' },
    { name: 'Buenos Aires', location: 'Argentina' },
    // ... você pode adicionar mais se quiser
  ];

  const handleApplyHospedes = () => {
    const criancasText = criancas === 1 ? '1 Criança' : `${criancas} Crianças`;
    const quartosText = quartos === 1 ? '1 Quarto' : `${quartos} Quartos`;
    setHospedes(`${adultos} Adultos, ${criancasText}, ${quartosText}`);
    setShowHospedesDropdown(false);
  };

  const handleSearchClick = () => {
    const params = new URLSearchParams({
      destino: destino,
      dataEntrada: dataEntrada,
      dataSaida: dataSaida,
      adultos: adultos.toString(),
      criancas: criancas.toString(),
      quartos: quartos.toString(),
    });

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="home-page">
      <main className="home-main-content">
        <h1 className="main-title">
          Os melhores <span className="highlight">Hotéis</span> e <span className="highlight">Destinos</span>
          <br />para sua viagem
        </h1>

        <div className="search-form-container">
          {/* Campo Destino */}
          <div className="input-group">
            <span className="icon">📍</span>
            <div className="input-wrapper">
              <label htmlFor="destino">Destino</label>
              <input
                type="text"
                id="destino"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                onFocus={() => setShowDestinoSuggestions(true)}
                onBlur={() => setTimeout(() => setShowDestinoSuggestions(false), 100)}
              />
              {showDestinoSuggestions && (
                <ul className="suggestions-dropdown destination-suggestions">
                  {destinoSuggestions
                    .filter(sug => sug.name.toLowerCase().includes(destino.toLowerCase()) || sug.location.toLowerCase().includes(destino.toLowerCase()))
                    .map((sug, index) => (
                      <li key={index} onClick={() => setDestino(sug.name)}>
                        <span className="icon">📍</span>
                        <div>
                          <strong>{sug.name}</strong>
                          <span>{sug.location}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>

          {/* Campo Entrada */}
          <div className="input-group">
            <span className="icon">🗓️</span>
            <div className="input-wrapper">
              <label htmlFor="entrada">Entrada</label>
              <input
                type="date"
                id="entrada"
                value={dataEntrada}
                onChange={(e) => setDataEntrada(e.target.value)}
              />
            </div>
          </div>

          {/* Campo Saída */}
          <div className="input-group">
            <span className="icon">🗓️</span>
            <div className="input-wrapper">
              <label htmlFor="saida">Saída</label>
              <input
                type="date"
                id="saida"
                value={dataSaida}
                onChange={(e) => setDataSaida(e.target.value)}
              />
            </div>
          </div>

          {/* Campo Hóspedes */}
          <div className="input-group guests-input-group">
            <span className="icon">👤</span>
            <div className="input-wrapper">
              <label htmlFor="hospedes">Hóspedes</label>
              <input
                type="text"
                id="hospedes"
                value={hospedes}
                readOnly
                onClick={() => setShowHospedesDropdown(!showHospedesDropdown)}
              />
              {showHospedesDropdown && (
                <div className="guests-dropdown">
                  <div className="guest-counter">
                    <span>Adultos</span>
                    <div>
                      <button onClick={() => setAdultos(Math.max(1, adultos - 1))}>-</button>
                      <span>{adultos}</span>
                      <button onClick={() => setAdultos(adultos + 1)}>+</button>
                    </div>
                  </div>
                  <div className="guest-counter">
                    <span>Crianças</span>
                    <div>
                      <button onClick={() => setCriancas(Math.max(0, criancas - 1))}>-</button>
                      <span>{criancas}</span>
                      <button onClick={() => setCriancas(criancas + 1)}>+</button>
                    </div>
                  </div>
                  <div className="guest-counter">
                    <span>Quartos</span>
                    <div>
                      <button onClick={() => setQuartos(Math.max(1, quartos - 1))}>-</button>
                      <span>{quartos}</span>
                      <button onClick={() => setQuartos(quartos + 1)}>+</button>
                    </div>
                  </div>
                  <button className="apply-guests-button" onClick={handleApplyHospedes}>Aplicar</button>
                </div>
              )}
            </div>
          </div>

          <button className="search-button" onClick={handleSearchClick}>Pesquisar</button>
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 | Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default Home;