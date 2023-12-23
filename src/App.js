import React, { useState, useEffect } from 'react';
import './App.css';
import ImageDisplay from './components/ImageDisplay';
import CardDetails from './components/CardDetails';
import CardData from './data/database.json';
import CardList from './components/CardList';

function App() {

  const [selectedCardName, setSelectedCardName] = useState(Object.keys(CardData.data[0])[0]);
  const [rangeValue, setRangeValue] = useState(1);

  const onSelectCard = (cardName) => {
    setSelectedCardName(cardName);
  };

  const onRangeChange = (e) => {
    setRangeValue(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    // Atualiza a imagem exibida sempre que a opção selecionada ou o valor do range mudar
    const startIndex = (rangeValue - 1) * 11;
    const firstCardName = Object.keys(CardData.data[startIndex])[0];
    setSelectedCardName(firstCardName);
  }, [rangeValue]);

  const startIndex = (rangeValue - 1) * 11;
  const endIndex = startIndex + 11;
  const visibleCards = CardData.data.slice(startIndex, endIndex);

  const cardId = CardData.data.find(card => Object.keys(card)[0] === selectedCardName)?.[selectedCardName]?.id;

  return (
    <div className="App">
      <header className="App-header">
        <h3 className='titulo'>Cartas do jogo Final Fantasy VIII</h3>
      </header>
      <div className='container'>
        <div className='level'>
          <p className='lblLevel'>Cartas nível {rangeValue}</p>
          <input defaultValue={1} type="range" className='barra' name="level" min="1" max="10" onChange={onRangeChange} />
        </div>
        <div className='lista'>
          <CardList cards={{data: visibleCards}} onSelectCard={onSelectCard} valorDefault={selectedCardName} />
        </div>
        <div className='display'>
          <ImageDisplay imageName={selectedCardName} />
        </div>
        <div className='details'>
          <CardDetails cardData={CardData.data[cardId - 1]} />
        </div>
      </div>
    </div>
  );
}

export default App;
