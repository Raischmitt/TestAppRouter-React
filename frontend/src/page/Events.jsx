import { Link } from 'react-router-dom';

const EVENTS = [
    { id: 'e1', title: 'event 1' },
    { id: 'e2', title: 'event 2' },
    { id: 'e3', title: 'event 3' },
    { id: 'e4', title: 'event 4' },
];

function Events() {
    return (
        <>
            <h1>Events</h1>
            <ul>
                {EVENTS.map((even) => (
                    <li key={even.id}>
                        <Link to={even.id}>{even.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Events;