import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const activeStyles = {
        'backgroundColor': '#40a9ff',
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('You just log out')
    }

    return (
        <div className='flex py-4 justify-between items-center'>
            <span className='flex justify-center items-center w-40 h-6 bg-gray-600 text-xs text-white rounded-sm'>
                Личный блог
            </span>

            {isAuth && (
                <ul className='flex gap-8'>
                    <li>
                        <NavLink
                            to={'/'}
                            href='/'
                            className='rounded-lg flex text-xs p-2 bg-gray-600 text-white hover:bg-[#40a9ff] ease-in-out duration-300'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Главная страница
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/posts'}
                            href='/'
                            className='rounded-lg flex text-xs p-2 bg-gray-600 text-white hover:bg-[#40a9ff] ease-in-out duration-300'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Мои посты
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/new'}
                            href='/'
                            className='rounded-lg flex text-xs p-2 bg-gray-600 text-white hover:bg-[#40a9ff] ease-in-out duration-300'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Новый посты
                        </NavLink>
                    </li>
                </ul>
            )}
            <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2 hover:bg-[#40a9ff] ease-in-out duration-300'>
                
                {isAuth ? (
                    <button onClick={logoutHandler}>Добро пожаловать {user?.username}</button>
                ) : (
                    
                    <Link to={'/login'}> Вход </Link>
                )}
            </div>
        </div>
    )
}

export default Navbar