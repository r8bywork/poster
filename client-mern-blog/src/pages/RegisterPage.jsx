import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, checkIsAuth } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (status) {
            toast(status)
        }
        if (isAuth) navigate('/')
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            dispatch(registerUser({ username, password }))
            setPassword('')
            setUsername('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className='w-1/4 h-60 mx-auto mt-40 bg-white p-[15px] rounded-lg'
        >
            <h1 className='text-lg text-center'>Окно регистрации</h1>
            <label className='text-xs text-black'>
                Имя пользователя:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Логин'
                    className='mt-1 text-black w-full rounded-lg border py-1 px-2 text-xs outline-none placeholder:text-gray-400'
                />
            </label>

            <label className='text-xs text-black'>
                Пароль:
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Пароль'
                    className='mt-1 text-black w-full rounded-lg border py-1 px-2 text-xs outline-none placeholder:text-gray-400'
                />
            </label>

            <div className='flex gap-8 justify-center mt-4'>
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'
                >
                    Подтвердить
                </button>
                <Link
                    to='/login'
                    className='flex justify-center items-center text-xs text-black'
                >
                    Уже зарегистрированы?
                </Link>
            </div>
        </form>
    )
}
