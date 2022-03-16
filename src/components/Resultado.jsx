import useClima from "../hooks/useClima"



const Resultado = () => {
  
  const { resultado } = useClima();
  const { name, main } = resultado;

  const kelvin = 273.15;
  const temperaturaActual = (main.temp - kelvin).toFixed(2); 
  const temperaturaMaxima = (main.temp_max - kelvin).toFixed(2); 
  const temperaturaMinima = (main.temp_min - kelvin).toFixed(2); 

    return (
        <div className="contenedor clima">
            <h2>{ name }</h2>
            <p>{ temperaturaActual } <span>&#x2103;</span></p>
            <div className="temp-min-max">
                <p> Min: { temperaturaMinima }<span>&#x2103;</span> </p>
                <p> Max: { temperaturaMaxima }<span>&#x2103;</span> </p>
            </div>
        </div>
  )
}

export default Resultado;