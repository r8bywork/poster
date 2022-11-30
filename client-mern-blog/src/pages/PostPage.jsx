import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    AiFillEye,
    AiOutlineMessage,
    AiTwotoneEdit,
    AiFillDelete,
} from 'react-icons/ai'
import Moment from 'react-moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from '../utils/axios'
import { removePost } from '../redux/features/post/postSlice'
import {
    createComment,
    getPostComments,
} from '../redux/features/comment/commentSlice'
import CommentItem from '../components/CommentItem/CommentItem'

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')

    const { user } = useSelector((state) => state.auth)
    const { comments } = useSelector((state) => state.comment)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            toast('Post was deleted')
            navigate('/posts')
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = () => {
        try {
            const postId = params.id
            dispatch(createComment({ postId, comment, user:user?.username }))
            setComment('')
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id))
        } catch (error) {
            console.log(error)
        }
    }, [params.id, dispatch])

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Загрузка...
            </div>
        )
    }
    return (
        <div>
            <Link className='rounded-lg text-xs p-2 bg-gray-600 text-white hover:bg-[#40a9ff] ease-in-out duration-300' to={'/'}>
                Возврат на главную страницу
            </Link>

            <div className='flex gap-10 py-5'>
                <div className='w-2/3 bg-[#fafafa] p-10 rounded-lg'>
                    <div className='flex flex-col basis-1/4 flex-grow'>
                        <div
                            className={
                                post?.imgUrl
                                    ? 'flex rouded-lg h-80'
                                    : 'flex rounded-lg'
                            }
                        >
                            {post?.imgUrl && (
                                <img
                                    src={`http://localhost:27017/${post.imgUrl}`}
                                    alt='img'
                                    className='object-cover w-full rounded-lg'
                                />
                            )}
                        </div>
                    </div>

                    <div className='flex justify-between items-center pt-2'>
                        <div className='text-base text-Black opacity-50'>
                            Создан {post.username}
                        </div>
                        <div className='text-base text-black opacity-50'>
                            <Moment date={post.createdAt} format='D MMM YYYY' />
                        </div>
                    </div>
                    <div className='text-Black text-2xl mt-2'>{post.title}</div>
                    <p className='text-black opacity-60 text-xl pt-4'>
                        {post.text}
                    </p>

                    <div className='flex gap-3 items-center mt-2 justify-between'>
                        <div className='flex gap-3 mt-4'>
                            <button className='flex items-center justify-center gap-2 text-xl text-black opacity-50'>
                                <AiFillEye /> <span>{post.views}</span>
                            </button>
                            <button className='flex items-center justify-center gap-2 text-xl text-black opacity-50'>
                                <AiOutlineMessage />{' '}
                                <span>{post.comments?.length || 0} </span>
                            </button>
                        </div>

                        {user?._id === post.author && (
                            <div className='flex gap-3 mt-4'>
                                <button className='flex items-center justify-center gap-2 text-xl text-black opacity-50'>
                                    <Link to={`/${params.id}/edit`}>
                                        <AiTwotoneEdit />
                                    </Link>
                                </button>
                                <button
                                    onClick={removePostHandler}
                                    className='flex items-center justify-center gap-2 text-xl text-black opacity-50'
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='w-1/3 p-8 bg-[#fafafa] flex flex-col gap-2 rounded-lg'>
                    <form
                        className='flex gap-2'
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Оставь комментарий!'
                            className='text-black w-full rounded-lg border p-2 text-xs outline-none placeholder:text-gray-400'
                        />
                        <button
                            type='submit'
                            onClick={handleSubmit}
                            className='rounded-lg w-[120px] text-xs p-2 bg-gray-600 text-white hover:bg-[#40a9ff] ease-in-out duration-300'
                        >
                            Отправить
                        </button>
                    </form>

                    {comments?.map((cmt) => (
                        <CommentItem key={cmt._id} cmt={cmt} />
                    ))}
                </div>
            </div>
        </div>
    )
}
