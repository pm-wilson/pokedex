import React from 'react';
import './details.css';
import request from 'superagent';
import { Link } from 'react-router-dom';

class BodyArea extends React.Component {
    state = {
        data: {},
    }

    componentDidMount = async () => {
        const displayId = this.props.match.params.myId,
            displayInfo = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${displayId}`),
            displayData = displayInfo.body.results[0];

        this.setState({
            data: displayData,
        })
    }

    render() {

        console.log(this.state.data.color_2)
        const {
            ability_1,
            ability_2,
            ability_hidden,
            attack,
            color_1,
            color_2,
            color_f,
            defense,
            hp,
            pokemon,
            special_attack,
            special_defense,
            speed,
            type_1,
            type_2,
            url_image,
        } = this.state.data;

        return (
            <section className='search-pokemon'
                style={{
                    backgroundColor: color_2,
                }}>
                <div>
                    <h2
                        style={{
                            backgroundColor: color_1,
                        }}>{pokemon}
                    </h2>
                    <img src={url_image} style={{
                        backgroundColor: color_f,
                    }} alt={pokemon} />
                </div>
                <div>
                    <p>Attack: {attack} / Special Attack: {special_attack}</p>
                    <p>Defense: {defense} / Special Defense: {special_defense}</p>
                    <p>Abilities: {ability_1}{ability_2 !== 'NA' ? ' and ' + ability_2 : ''}</p>
                    <p>{ability_hidden ? 'Hidden Ability: ' + ability_hidden : ''}</p>
                    <p>Hp: {hp}</p>
                    <p>Speed: {speed}</p>
                    <p>Types: {type_1}{type_2 !== 'NA' ? ' and ' + type_2 : ''}</p>
                    <Link to='/'>Back to Search</Link>
                </div>
            </section>
        );
    }
}

export default BodyArea;