import { useParams } from 'react-router-dom';

function EventDetail() {
    const params = useParams();
    return (
        <>
            <h1>Event Detail</h1>
            <p>{params.eventId}</p>

        </>
    );
}

export default EventDetail;