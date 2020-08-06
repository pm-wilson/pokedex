import React from 'react';
import './details.css';
import request from 'superagent';

class BodyArea extends React.Component {
    state = {
        data: {},
    }

    componentDidMount = async (e) => {
        const displayId = this.props.match.params.myId,
            displayInfo = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex/${displayId}`),
            displayData = displayInfo.body;

        this.setState({
            data: displayData
        })
    }

    render() {
        // const 


        // console.log('state', this.state)

        return (
            <section>
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
                detail page
            </section>
        );
    }
}

export default BodyArea;