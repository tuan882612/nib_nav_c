import { useLocation } from 'react-router-dom'
import '../Assets/Styles/Auth.css'

export default function Auth() {
    const transfer = useLocation()
    console.log(transfer.state)
    
    return (
        <div className='auth'>
            <h2 className='auth-header'>
                auth
            </h2>
        </div>
    )
}