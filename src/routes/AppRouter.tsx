import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { userRoutes } from './userRoutes'

const AppRouter = () => {
const router = createBrowserRouter(userRoutes, {
  basename: '/react-training', 
});

    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter
