import React from 'react';
import axios from 'axios';
import { Rings } from 'react-loader-spinner';

export default function LoginForm() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginStatus, setLoginStatus] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const submitLoginForm = async (e) => {
        e.preventDefault();

        try {
            setLoading(true); // Attiva il loader nel momento in cui parte la chiamata

            const response = await axios.post(
                'https://staging-api.takyon.io/auth/login',
                {
                    email,
                    password,
                }
            );

            setLoading(false); // Disattiva il loader dopo la chiamata API (in questo caso con esito positivo)

            console.log(response.data);

            setLoginStatus('success'); // l'accesso è riuscito

        } catch (error) {
            console.error(error);
            setLoading(false); // Disattiva il loader anche in caso di errore! importante
            setLoginStatus('error'); // l'accesso non è riuscito (credenziali sbagliate)
        }
    };

    return (
        <main>
            <div className='container'>
                <form onSubmit={submitLoginForm}>
                    <h2>
                        Login
                    </h2>

                    <p>Email</p>
                    <input
                        className='form--input'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <p>Password</p>
                    <input
                        className='form--input'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* mostra il loader nel momento in cui viene impostato loading su true (quindi chiamata API inoltrata) e solo per la sua durata */}
                    {loading && (
                        <div className='loader'>
                            <Rings color="#0c1348" height={50} width={50} />
                            <Rings color="#0c1348" height={50} width={50} />
                            <Rings color="#0c1348" height={50} width={50} />
                        </div>
                    )}

                    {/* mostra un piccolo paragrafo di notifica a seconda dell'esito del login */}
                    {loginStatus === 'success' && <p className='form--success'>Login successful!</p>}
                    {loginStatus === 'error' && <p className='form--error'>Invalid credentials. Please try again.</p>}

                    <button className='form--button' type="submit">LOGIN</button>
                </form>
            </div>
        </main>
    );
};
