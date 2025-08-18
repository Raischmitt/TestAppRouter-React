import { useParams } from 'react-router-dom';

function EditEvent() {
    const params = useParams();

    return (
        <>
            <h1>Home</h1>
            <p>{params.eventId}</p>
        </>
    );
}

export default EditEvent;