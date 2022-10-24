import React from 'react'
import { Link } from 'react-router-dom'

const PopularPosts = ({ post }) => {
    return (
        <div className='my-1'>
            <Link
                to={`${post._id}`}
                className='rounded-lg flex text-xs p-2 bg-gray-600 text-white hover:bg-[#40a9ff] ease-in-out duration-300'
            >
                {post.title}
            </Link>
        </div>
    )
}

export default PopularPosts