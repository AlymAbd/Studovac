import React from 'react'

const UserSettings = React.lazy(() => import('@r/pages/cabinet/user/UserSettings'))
const UserTable = React.lazy(() => import('@r/pages/cabinet/user/User'))
const UserDetail = React.lazy(() => import('@r/pages/cabinet/user/UserDetail'))

const Course = React.lazy(() => import('@r/pages/cabinet/course/Course'))
const CourseDetail = React.lazy(() => import('@r/pages/cabinet/course/Course'))
const CoursePrices = React.lazy(() => import('@r/pages/cabinet/course/Prices'))
const CoursePricesDetail = React.lazy(() => import('@r/pages/cabinet/course/PricesDetail'))
const CourseCategory = React.lazy(() => import('@r/pages/cabinet/course/Categories'))
const CourseCategoryDetail = React.lazy(() => import('@r/pages/cabinet/course/CategoriesDetail'))

const routes = [
  { path: '/user_settings/:id', name: 'User settings', element: UserSettings },
  { path: '/users', exact: true, name: 'Users', element: UserTable },
  { path: '/users/create', exact: true, name: 'User create', element: UserDetail },
  { path: '/users/:id', name: 'User detail', element: UserDetail },

  { path: '/course/category', exact: true, name: 'Course category', element: CourseCategory },
  { path: '/course/category/create', exact: true, name: 'Course category detail', element: CourseCategoryDetail },
  { path: '/course/category/:id', name: 'Course category detail', element: CourseCategoryDetail },

  { path: '/course', exact: true, name: 'Course', element: Course },
  { path: '/course/create', exact: true, name: 'Course create', element: CourseDetail },
  { path: '/course/:id', name: 'Course detail', element: CourseDetail },

  { path: '/course/prices', exact: true, name: 'Course prices', element: CoursePrices },
  { path: '/course/prices/create', exact: true, name: 'Course price create', element: CoursePricesDetail },
  { path: '/course/prices/:id', name: 'Course detail', element: CoursePricesDetail },
]

export default routes
