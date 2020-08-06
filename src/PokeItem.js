import React from 'react';

class PokeItem extends React.Component {

    render() {
        return (
            <div className='poke-item'>
                <h2>{this.props.poke.pokemon}</h2>
                <img src={this.props.poke.url_image} alt={this.props.poke.pokemon} />
                <p>Type: {this.props.poke.type_1}{this.props.type_2 ? ' and ' + this.props.poke.type_2 : ''}</p>
                <p>Attack: {this.props.poke.attack}</p>
                <p>Defense: {this.props.poke.defense}</p>
            </div>
        );
    }
}

export default PokeItem;