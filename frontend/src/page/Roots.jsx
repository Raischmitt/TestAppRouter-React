import MainNavigation from '../components/MainNavigation';

import { Outlet } from 'react-router-dom';

function Roots() {
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Roots;