import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

import { useRouterError } from 'react-router-dom';

function Error() {
    const error = useRouterError();

    let title = "An error accurred!";
    let message = "Something went wrong";

    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.status === 404) {
        title = 'Not found'
        message = 'Could not find resource or page'
    }

    return (
        <>
        <MainNavigation />
            <PageContent title={title} >
                <p>{message}</p>
            </PageContent >
        </>
    );

}

export default Error;