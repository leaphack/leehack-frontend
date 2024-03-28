import { useState } from 'react'
import axios from 'axios'

function EmailForm({ jobId }) {

    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleEmail = (e) => setEmail(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()

        const requestBody = { email, jobId }

        axios.post("http://localhost:3000/api/users", requestBody)
            .then((response) => {
                console.log(response)
                const errorDescription = response.data.message
                setErrorMessage(errorDescription)
            })
            .catch((error) => {
                console.log(error)
                const errorDescription = error.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <input
                        type="email"
                        name="email"
                        className="inputField"
                        placeholder="Email"
                        required={true}
                        value={email}
                        onChange={handleEmail}
                    />
                    <label
                        className="inputLabel"
                        htmlFor="email">Email
                    </label>
                </div>
                <p className='registerNote-text'>Mit der Anmeldung bestätigst du, dass du einverstanden bist, dass wir dich kontaktieren dürfen, sobald wir den Job für dich gefunden haben oder eine passende Alternative.</p>
                <button type="submit" className="submitButton">
                    Submit
                </button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    )
}

export default EmailForm