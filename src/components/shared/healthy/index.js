import React, { Component } from 'react';
import axios from 'axios'

export class Healthy extends Component {
    state = {
        healthy: true,
        status: 200
    }
    async componentDidMount() {
        try {
            const apiHealthBaseUrl = process.env["REACT_APP_API_ENDPOINT_Health"]
            const response = await axios.get(apiHealthBaseUrl + 'ready');
            this.setState({ status: response.status })
        } catch (error) {
            this.setState({ status: error.response.status, healthy: false })
            console.error(error);
        }
    }
    render() {
        return null;
    }
}