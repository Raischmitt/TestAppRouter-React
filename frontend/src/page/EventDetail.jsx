import { redirect, useRouteLoaderData, Await } from 'react-router-dom';
import { defer, json } from '@remix-run/router';
import { Suspense } from 'react';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

function EventDetail() {
    const { event, events } = useRouteLoaderData('event-detail');

    return (
        <>
            <Suspense fallbsck={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={event}>
                    {loadEvent => <EventItem event={loadEvent} />}
                </Await>
            </Suspense>
            <Suspense fallbsck={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {loadEvents => <EventsList events={loadEvents} />}
                </Await>
            </Suspense>
        </>
    );
}

export default EventDetail;

async function loadEvent(id) {
    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
        throw json({ message: 'could not fetch details for selected event.' },
            {
                status: 500,
            }
        );

    } else {
        const resData = await response.json();
        return resData.event;
    }
}

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

export async function loader({ request, params }) {
    const id = params.eventId;

    return defer({
        event: await loadEvent(id),
        events: loadEvents()
    });
}

export async function action({ params, request }) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method,
    });

    if (!response.ok) {
        throw json({ message: 'could not delet event' },
            {
                status: 500,
            }
        );

    }
    return redirect('/events');
}