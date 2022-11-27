export default function ClientDetails({ clientName, clientAddress, clientPhone, clientId }) {
  return (
    <>
      <section className="mt-10">
        <h2 className="text-2xl uppercase font-bold mb-1">{clientName}</h2>
        <h2 className="text-xl uppercase font-bold mb-1">{clientId}</h2>
        <p>{clientAddress}</p>
        <p>{clientPhone}</p>
      </section>
    </>
  )
}