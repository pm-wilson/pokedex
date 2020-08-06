import React from 'react';
import PokeItem from './PokeItem';

class BodyArea extends React.Component {

    render() {
        return (
            <section>
                {this.props.filtereData.map((poke, i) => {
                    return (
                        <PokeItem poke={poke} key={i} />
                    )
                })}
            </section>
        );
    }
}

export default BodyArea;