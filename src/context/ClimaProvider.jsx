import axios from 'axios';
import { createContext, useState } from 'react';



const ClimaContext = createContext();


const ClimaProvider = ({ children }) => {

    const [ busqueda, setBusqueda ] = useState({
        ciudad: '',
        pais: ''
    });
    const [ resultado, setResultado ] = useState({});
    const [ cargando, setCargando ] = useState(false);
    const [ sinResultados, setSinResultados ] = useState('');


    const datosBusqueda = ( e ) => {
        setBusqueda(
            {
                ...busqueda,
                [e.target.name]: e.target.value
            }
        );
    }

    const getClima = async() => {
        setResultado({});
        setCargando( true );
        const { ciudad, pais } = busqueda;
        try {
            const appId = import.meta.env.VITE_API_KEY;
            
            // Optenemos la longitud y latitud de la ciudad seleccionada 
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ ciudad },${ pais }&limit=${ 1 }&appid=${ appId }`;

            const { data } = await axios.get(url)
            const { lat, lon }= data[0];

            // Cosultamos el Clima utilizando la Latitud y Longitud previamente obtenida
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&appid=${ appId }`;

            const { data: clima } = await axios.get(urlClima);
            setResultado( clima ); 

        } catch (error) {
            console.log(error);
            setSinResultados(`No se encontraron resultados para: <span>${ ciudad }</span>`)
        }finally{
            setTimeout(() => {
                setCargando(false)
            }, 2000);
        }

    }

    return(
        <ClimaContext.Provider
            value={{
                busqueda,
                datosBusqueda,
                getClima,
                resultado,
                cargando,
                sinResultados
            }}
        >
            { children }
        </ClimaContext.Provider>
    )
}


export {
    ClimaProvider
}

export default ClimaContext;
