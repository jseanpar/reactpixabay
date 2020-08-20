import React from 'react';
import Resultado from './Resultado';

class Buscador extends React.Component {

    state = {
        termino: '',
        imagenes: [],
        pagina: ''
    }

    scroll = () => {
        const elemento = document.querySelector('.jumbotron');
        elemento.scrollIntoView('smooth', 'start')
    }

    busquedaRef = React.createRef();

    paginaAnterior = () => {
        let pagina = this.state.pagina

        if (pagina == 1) return null

        pagina--;

        this.setState({
            pagina
        }, () => {
            this.consultarApi()
            this.scroll()
        });
    }

    paginaSiguiente = () => {
        let pagina = this.state.pagina
        pagina++;

        this.setState({
            pagina
        }, () => {
            this.consultarApi()
            this.scroll()
        });
    }

    consultarApi = (valor) => {

        let termino = '';
        if (!valor) {
            termino = this.state.termino
        } else {
            termino = valor
        }

        const pagina = this.state.pagina
        const url = `https://pixabay.com/api/?key=15713062-b8d21280742c98a54ea60c15c&q=${termino}&page=${pagina}`

        console.log(url);
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => this.setState({ imagenes: resultado.hits }))
    }

    obtenerDatos = (e) => {
        e.preventDefault();

        const valor = this.busquedaRef.current.value;
        this.setState({
            pagina: 1,
            termino: valor
        })
        this.consultarApi(valor);

    }
    render() {

        const img_data = this.state.imagenes
        return (
            <form onSubmit={this.obtenerDatos}>
                <div className="row">
                    <div className="form-group col-md-8">
                        <input type="text"
                            ref={this.busquedaRef}
                            className="form-control 
                            form-control-lg"
                            placeholder="busca tu imagen, ej: futbol"
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit"
                            className="btn btn-lg btn-danger btn-block"
                            value="Buscar"
                        />
                    </div>
                    <div className="row justify-content-center">
                        <Resultado
                            data={img_data}
                            paginaAnterior={this.paginaAnterior}
                            paginaSiguiente={this.paginaSiguiente}
                        />
                    </div>
                </div>
            </form>
        );
    }
}

export default Buscador;