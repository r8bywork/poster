import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/features/post/postSlice'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'
export const AddPostPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = () => {
        try {
          console.log(image)
          if((title && text) !== '') {
            const data = new FormData()
            data.append('title', title)
            data.append('text', text)
            data.append('image', image)
            dispatch(createPost(data))
            navigate('/')
          } else {
            toast("Fill in all the fields!!!")
          }
        } catch (error) {
            console.log(error)
        }
    }
    const clearFormHandler = () => {
        setText('')
        setTitle('')
    }

    return (
        <form
            className='w-1/3 mx-auto py-10 bg-white rounded-lg p-[15px]'
            onSubmit={(e) => e.preventDefault()}
        >
            <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                Add Image:
                <input
                    type='file'
                    className='hidden'
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </label>
            <div className='flex object-cover py-2 w-[200px]'>
                {image && (
                    <img src={URL.createObjectURL(image)} alt={image.name} />
                )}
            </div>

            <label className='text-xl text-Black opacity-70'>
            Post title:
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Title'
                    className='mt-1 text-Black w-full rounded-lg border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xl text-Black opacity-70'>
                Post text:
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder='Text for post'
                    className='mt-1 text-black w-full rounded-lg border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
                />
            </label>

            <div className='flex gap-8 items-center justify-center mt-4'>
                <button
                    onClick={submitHandler}
                    className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
                >
                    Add
                </button>

                <NavLink to={'/'} 
                className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'>
                  Exit
                </NavLink>

                <button
                    onClick={clearFormHandler}
                    className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
                >
                    Clear
                </button>
            </div>
        </form>
    )
}
