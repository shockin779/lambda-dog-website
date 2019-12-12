import "./App.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocalStorage } from "./utils/input";
import { useDogImages } from "./utils/api";

function App(props) {
  // we're calling our custom hooks here, and passing the parameters we defined in input.js
  const [breed, setBreed] = useLocalStorage("breed", "husky");
  const [count, setCount] = useLocalStorage("count", 1);
  const [breedList, setBreedList] = useState(null);

  // since we're not testing our side effects yet , comment this out
  const [images, setImages] = useDogImages(breed, count);
  //const [images] = useState([]);

  useEffect(() => {
    
    const getBreedsList = async () => {
      let res = await axios.get('https://dog.ceo/api/breeds/list/all');
      let breedArray = Object.entries(res.data.message)
      breedArray = breedArray.filter(breed => breed[1].length === 0);
      setBreedList(breedArray);
    }
    getBreedsList();
  }, []);  

  return (
    <>
      <h1>The Dog Website</h1>

      <select value={breed} onChange={e => setBreed(e.target.value)}>
        {
          !breedList ? <option value='loading'>Loading</option> : breedList.map(breed => <option key={breed[0]} value={breed[0]}>{breed[0]}</option>)
        }
      </select>

      <input
        type="number"
        placeholder="Count"
        value={count}
        onChange={e => setCount(e.target.value)}
      />

      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt="Dog" />
        ))}
      </div>
      <button onClick={() => setImages([])}>clear images</button>
    </>
  );
}

export default App;
