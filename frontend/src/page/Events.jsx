import { useLoaderData, Await } from 'react-router-dom';
import { json, defer } from '@remix-run/router';
import { Suspense } from 'react';

import EventsList from '../components/EventsList';

function Events() {
    const { events } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {(loadEvents) => <EventsList events={loadEvents} />}
            </Await>
        </Suspense>
    );
}

export default Events;

async function loadEvents() {
    const response = await fetch("http://localhost:8080/events");

    if (!response.ok) {
        throw json(
            { message: 'Could not fetch events' },
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export function loader() {
    return defer({
        events: loadEvents(),
    })
}