import { useState } from 'react'
import useClima from './../hooks/useClima'

const Formulario = () => {

    const [ alerta, setAlerta ] = useState('')

    const { busqueda, datosBusqueda, getClima } = useClima();
    const { ciudad, pais } = busqueda;

    const handleSubmit = ( e ) => {
        e.preventDefault()

        if ( Object.values( busqueda ).includes('') ) {
            setAlerta('Todos los campos son obligatorios');
            return;
        }
        
        setAlerta('')
        getClima()
    }

  return (
    <div className="contenedor">
        {alerta && <p className='alerta'>{ alerta }</p>  }
        <form onSubmit={ handleSubmit }>
            <div className="campo">
                <label htmlFor="ciudad">Ciudad</label>
                <input 
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={ ciudad }
                    onChange={ datosBusqueda } />
            </div>
            <div className="campo">
                <label htmlFor="pais">País</label>
                <select 
                    name="pais" id="pais" 
                    value={ pais }
                    onChange={ datosBusqueda } >
                    <option value="">--Selecciones un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
            </div>
            <input type="submit" value="Cosultar Clima" />
        </form>
    </div>
  )
}

export default Formulario