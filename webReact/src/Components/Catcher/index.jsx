// Core
import React, { Component } from 'react'

// Instruments
import Styles from './styles.less'

export default class Catcher extends Component {
    state = {
        error: false,
    }

    UNSAFE_componentDidCatch(error, stack) {
        console.log('ERROR:', error.message)
        console.log('STACKTRACE:', stack.componentStack)

        this.setState({
            error: true,
        })
    }

    render() {
        const { error } = this.state
        const { children } = this.props

        if (error) {
            return (
                <section className={Styles.catcher}>
                    <span>Unknown error happened.</span>
                    <p>Our engineers team already working in order to fix that for you!</p>
                </section>
            )
        }

        return children
    }
}
