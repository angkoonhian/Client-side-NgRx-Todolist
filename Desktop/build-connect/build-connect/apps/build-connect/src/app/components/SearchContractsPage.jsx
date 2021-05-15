import React from 'react';
import {
    Heading,
    Button
} from "@chakra-ui/react"

const SearchContractsPage = (props) => {
    const { setScreen } = props
    const handleBackHome = () => {
        setScreen("LandingPage")
    }
    return (
        <div>
            <Heading>WORK IN PROGRESS</Heading>
            <Button onClick = {handleBackHome}>Back to Home</Button>
        </div>
    )
}

export default SearchContractsPage

