const { render, screen } = require('@testing-library/react');
const { MemoryRouter, Route, Routes } = require('react-router-dom');

const { PublicRoute } = require('../../src/router/PublicRoute');
const { AuthContext } = require('../../src/auth');

describe('Pruebas en <PublicRoute />', () => {

    test('debe de mostrar el children si no está autenticado', () => {
        const contextValue = {
            logged: false
        };

        render(
            <AuthContext.Provider value={contextValue} >
                <PublicRoute >
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        // screen.debug();

        expect(screen.getByText('Ruta pública')).toBeTruthy();

    });

    test('debe de navegar si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC123'
            }
        };

        render(
            <AuthContext.Provider value={contextValue} >
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute >
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        } />
                        <Route path="marvel" element={<h1>Página Marvel</h1>} />
                    </Routes>


                </MemoryRouter>
            </AuthContext.Provider>
        );

        // screen.debug();

        expect(screen.getByText('Página Marvel')).toBeTruthy();

    });
});