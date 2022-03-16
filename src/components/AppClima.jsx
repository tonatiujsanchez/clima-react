import Formulario from "./Formulario"
import Resultado from './Resultado'
import Loading from './Loading'

import useClima from "../hooks/useClima"

const AppClima = () => {

    const { resultado, cargando, sinResultados } = useClima();
  return (
    <>
        <main className="dos-columnas">
            <Formulario />

            { cargando
                ? <Loading />
                : Object.keys( resultado ).length > 0
                    ? <Resultado />
                    : sinResultados
                        ? <p className="sin-resultados" dangerouslySetInnerHTML={{__html: sinResultados}}></p>
                        :<p className="sin-resultados">Consulta el Clima</p>
            }
        </main>
    </>
  )
}

export default AppClima