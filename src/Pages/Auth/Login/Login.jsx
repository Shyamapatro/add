import React from 'react'
import Styles from './Login.module.css'
import { login } from '../../../http'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../redux/slice​/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async () => {
        const data = new FormData();
        data.append('email', email)
        data.append('password', password)
        
        if (email && password) {
            setLoading(true)
            try {
                const response = await login(data)
                if (response.status === 200) {
                    if (response.data.message === 'username or password is incorrect!') {
                        toast.error('username or password is incorrect!')
                        setLoading(false)
                        return;
                    }
                    const { accessToken, refreshToken } = response.data.data;
                    const { user } = response.data.data;
                    toast.success('Login successfully')
                    setLoading(false)
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    window.location.href = "/admin/dashboard";
                    dispatch(setAuth(user))
                }
            } catch (error) {
                setLoading(false)
                console.log(error.response.data.message)
                toast.error(error.response.data.message)
            }
        } else {
            toast.error('Please fill all the fields')
        }
    }
    return (
        <>
            <div className='flex items-center justify-center h-screen'>
                <dir className={`${Styles.login} w-full rounded-xl mx-5 px-5 md:w-full lg:max-w-2xl lg:rounded-3xl`}>
                    <div className='flex flex-col items-center justify-center my-8'>
                        <h1 className='text-white text-4xl font-bold'>Admin Panel</h1>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Email Address'
                            onChange={(e) => setEmail(e.target.value)}
                            className={`${Styles.input} my-5 focus:outline-none px-6 mt-14 w-full h-16 lg:max-w-md `}
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${Styles.input} mb-4 focus:outline-none px-6 w-full h-16 lg:max-w-md`}
                        />
                        {
                            loading ? <button className={`btn loading text-white loading capitalize font-bold py-2 mt-10 px-4 rounded lg:mb-7 ${Styles.login_btn}`}>loading</button> : <button onClick={handleSubmit} className={` text-white loading capitalize font-bold py-2 mt-10 px-4 rounded lg:mb-7 ${Styles.login_btn}`}>Login</button>
                        }
                    </div>
                </dir>
            </div>
        </>
    )
}

export default Login;
