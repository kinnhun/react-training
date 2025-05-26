  
import { Navigate } from 'react-router-dom'
import SignIn from '../pages/signIn/SignIn'
import { DefaultLayout } from '../layouts/DefaultLayout'
import ForgotPassword from '../pages/forgotPassword/ForgotPassword'
import SignUp from '../pages/signUp/SignUp'
import { Welcome } from '../pages/welcome/Welcome'
import ProtectedRoute from '../components/ProtectedRoute'
import GuestRoute from '../components/GuestRoute'
import { LessonLayout } from '../layouts/LessonLayout'
import { Lesson } from '../pages/lesson/Lesson'
import { Lesson01 } from '../pages/pageLesson/Lesson01/Lesson01'
import { Lesson02 } from '../pages/pageLesson/Lesson02/Lesson02'
import { Lesson03 } from '../pages/pageLesson/Lesson03/Lesson03'
import { Lesson04 } from '../pages/pageLesson/Lesson04/Lesson04'
import { Lesson05 } from '../pages/pageLesson/Lesson05/Lesson05'
import { Lesson06 } from '../pages/pageLesson/Lesson06/Lesson06'
import { Lesson07 } from '../pages/pageLesson/Lesson07/Lesson07'
import { Lesson08 } from '../pages/pageLesson/Lesson08/Lesson08'
import { Lesson10 } from '@/pages/pageLesson/Lesson10/Lesson10'




export const userRoutes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="sign-in" replace />
      },
      {
        path: 'sign-in',
        element: (
          <GuestRoute>
            <SignIn />
          </GuestRoute>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <GuestRoute>
            <ForgotPassword />
          </GuestRoute>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <GuestRoute>
            <SignUp />
          </GuestRoute>
        ),

      },
      {
        path: 'welcome',
        element: (
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        ),
      },


    ]
  },
{
  path: 'lesson',
  element: <LessonLayout />,
  children: [
    {
      index: true,
      element: (
        <ProtectedRoute>
          <Lesson />
        </ProtectedRoute>
      ),
    },
    {
      path: '1',
      element: (
        <ProtectedRoute>
          <Lesson01 />
        </ProtectedRoute>
      ),
    },
    {
      path: '2',
      element: (
        <ProtectedRoute>
          <Lesson02 />
        </ProtectedRoute>
      ),
    },
    {
      path: '3',
      element: (
        <ProtectedRoute>
          <Lesson03 />
        </ProtectedRoute>
      ),
    },
    {
      path: '4',
      element: (
        <ProtectedRoute>
          <Lesson04 />
        </ProtectedRoute>
      ),
    },
    {
      path: '5',
      element: (
        <ProtectedRoute>
          <Lesson05 />
        </ProtectedRoute>
      ),
    },
    {
      path: '6',
      element: (
        <ProtectedRoute>
          <Lesson06 />
        </ProtectedRoute>
      ),
    },
    {
      path: '7',
      element: (
        <ProtectedRoute>
          <Lesson07 />
        </ProtectedRoute>
      ),
    },
    {
      path: '8',
      element: (
        <ProtectedRoute>
          <Lesson08 />
        </ProtectedRoute>
      ),
    },
    {
      path: '10',
      element:(
        <ProtectedRoute>
        <Lesson10 />
      </ProtectedRoute>
      )
    }
  ],
}
]
