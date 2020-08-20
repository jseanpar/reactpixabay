import React from 'react';
import Imagen from './Imagen';
import Paginacion from './Paginacion';

class Resultado extends React.Component {


    render() {

        const data = this.props.data;

        return (
            <React.Fragment>
                <div className="col-12 p-5 row" >
                    {
                        data.map(imagen => (
                            <Imagen
                                key={imagen.id}
                                imagen={imagen}
                            />
                        ))
                    }
                </div>
                {data.length !== 0 ?
                    <Paginacion
                        paginaAnterior={this.props.paginaAnterior}
                        paginaSiguiente={this.props.paginaSiguiente}
                    />
                    :
                    <div></div>
                }

            </React.Fragment>
        )
    }
}

export default Resultado;