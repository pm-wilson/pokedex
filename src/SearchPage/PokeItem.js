import React from 'react';
import { Link } from 'react-router-dom'

class PokeItem extends React.Component {
    render() {
        const pokeId = this.props.poke.pokemon;

        return (
            <Link to={`/DetailPage/${pokeId}`} style={{
                backgroundColor: this.props.poke.color_2,
            }}>
                <div className='poke-item'>
                    <h2 style={{
                        backgroundColor: this.props.poke.color_1,
                    }}>{this.props.poke.pokemon}</h2>
                    <img style={{
                        backgroundColor: this.props.poke.color_f,
                    }} src={this.props.poke.url_image} alt={this.props.poke.pokemon} />
                    <p>Type: {this.props.poke.type_1}{this.props.type_2 ? ' and ' + this.props.poke.type_2 : ''}</p>
                    <p>Attack: {this.props.poke.attack}</p>
                    <p>Defense: {this.props.poke.defense}</p>
                </div>
            </Link>
        );
    }
}

export default PokeItem;