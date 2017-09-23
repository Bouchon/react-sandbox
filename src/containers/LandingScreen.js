import React, { Component } from 'react'
import Typography from 'material-ui/Typography'

class LandingScreen extends Component {
    render () {
        return (
            <div>
                <Typography type='title'>Landing screen</Typography>
                <Typography paragraph={true}>This react application was created to test some of interesting react packages. In most of case, each page is dedicated to a specific package.</Typography>
            </div>
        )
    }
}

export default LandingScreen