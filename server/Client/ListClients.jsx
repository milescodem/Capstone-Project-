import react from 'react'
import axios from 'axios'


function ListClients() {
    const [clients, setClients] = react.useState([])

    react.useEffect(() => {
        axios.get('http://localhost:3000/clients')
            .then(response => {
                setClients(response.data)
            })
            .catch(error => {
                console.error('Error fetching clients:', error)
            })
    }, [])

    return ( 