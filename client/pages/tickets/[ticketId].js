import { useEffect, useState } from 'react';

const ShowTicket = ({ ticketId, client }) => {
  const [ticket, setTicket] = useState(null);

  return (
    <div>
      <h1>Show Ticket</h1>
      <p>This is the ticket detail page.</p>
    </div>
  );
};

export default ShowTicket;
