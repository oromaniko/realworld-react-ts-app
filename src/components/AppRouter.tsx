import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, RouteNames, publicRoutes } from '../routes'
import { useTypedSelector } from '../hooks/useTypedSelector'

const AppRouter = () => {
    const { isAuth } = useTypedSelector((state) => state.auth)

    return (
        <Routes>
            {isAuth ? (
                <>
                    {privateRoutes.map(({ path, element: Element }) => {
                        return (
                            <Route
                                path={path}
                                element={<Element />}
                                key={path}
                            />
                        )
                    })}
                    <Route
                        path='*'
                        element={<Navigate replace to={RouteNames.HOME} />}
                    />
                </>
            ) : (
                <>
                    {publicRoutes.map(({ path, element: Element }) => {
                        return (
                            <Route
                                path={path}
                                element={<Element />}
                                key={path}
                            />
                        )
                    })}
                    <Route
                        path='*'
                        element={<Navigate to={RouteNames.HOME} />}
                    />
                </>
            )}
        </Routes>
    )
}

export default AppRouter
