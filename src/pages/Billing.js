import { useState, useRef} from "react"
import ClientDetails from "./ClientDetails"
import Dates from "./Dates"
import BillingFooter from "./BillingFooter"
import BillingHeader from "./BillingHeader"
import MainDetails from "./MainDetails"
import Notes from "./Notes"
import Table from "./Table"
import TableForm from "./TableForm"
import ReactToPrint from "react-to-print"
import './Billing.css'
const Billing = () => {
  const [showInvoice,setShowInvoice]=useState(false)
  const [clientId,setClientId]= useState("")
  const [clientName,setClientName]= useState("")
  const [clientAddress,setClientAddress]= useState("")
  const [clientPhone,setClientPhone]= useState("")
  const [invoiceNumber,setInvoiceNumber]= useState("")
  const [invoiceDate,setInvoiceDate]= useState("")
  const [notes,setNotes]= useState("")
  const [description, setDescription]= useState("")
  const [quantity, setQuantity]=useState("")
  const [price,setPrice]=useState("")
  const [amount,setAmount]= useState("")
  const [list,setList] = useState([])
  const [total,setTotal]=useState(0)

  const componentRef=useRef()

  const handlePrint = () => {
    window.print()
  }
  return (
    <>
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
      
      {showInvoice ? (
        <>
         <ReactToPrint
            trigger={() => (
              <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                Print / Download
              </button>
            )}
            content={() => componentRef.current}
          />
         <div ref={componentRef} className="p-5">
            <BillingHeader handlePrint={handlePrint} />

            <MainDetails />

            <ClientDetails
            clientId={clientId}
              clientName={clientName}
              clientAddress={clientAddress}
              clientPhone={clientPhone}
            />

            <Dates
              invoiceNumber={invoiceNumber}
              invoiceDate={invoiceDate}
            />

            <Table
              description={description}
              quantity={quantity}
              price={price}
              amount={amount}
              list={list}
              setList={setList}
              total={total}
              setTotal={setTotal}
            />

            <Notes notes={notes} />

            <BillingFooter
            />
          </div>
          <button
            onClick={() => setShowInvoice(false)}
            className="mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
          >
            Edit Information
          </button> 
        </>
     ) : (
          <>
          {/*  client name, client address, invoice number, invoice date, due date, notes */}
          <div className="flex flex-col justify-center">
      
            <article className="md:grid grid-cols-2 gap-10 md:mt-5">

            <div className="flex flex-col">
                  <label htmlFor="clientId">Patient's ID</label>
                  <input
                    type="text"
                    name="clientId"
                    id="clientId"
                    placeholder="Enter your patient's Id"
                    autoComplete="off"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  />
                </div>

            <div className="flex flex-col">
                  <label htmlFor="clientName">Patient's name</label>
                  <input
                    type="text"
                    name="clientName"
                    id="clientName"
                    placeholder="Enter your patient's name"
                    autoComplete="off"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>

            </article>

              <article className="md:grid grid-cols-2 gap-10 md:mt-5">

                <div className="flex flex-col">
                  <label htmlFor="clientAddress">
                    Patient's address
                  </label>
                  <input
                    type="text"
                    name="clientAddress"
                    id="clientAddress"
                    placeholder="Enter your patient's address"
                    autoComplete="off"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="clientPhone">
                    Patient's Contact Number
                  </label>
                  <input
                    type="text"
                    name="clientPhone"
                    id="clientPhone"
                    placeholder="Enter your patient's contact"
                    autoComplete="off"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                  />
                </div>

              </article>

<article className="md:grid grid-cols-2 gap-10 md:mt-10">
                <div className="flex flex-col">
                  <label htmlFor="invoiceNumber">Bill Number</label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    id="invoiceNumber"
                    placeholder="Bill Number"
                    autoComplete="off"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="invoiceDate">Bill Date</label>
                  <input
                    type="date"
                    name="invoiceDate"
                    id="invoiceDate"
                    placeholder="Bill Date"
                    autoComplete="off"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>

              </article>

{/* This is our table form */}
<article>
                <TableForm
                  description={description}
                  setDescription={setDescription}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  price={price}
                  setPrice={setPrice}
                  amount={amount}
                  setAmount={setAmount}
                  list={list}
                  setList={setList}
                  total={total}
                  setTotal={setTotal}
                />
              </article>


              <label htmlFor="notes">Additional Notes</label>
              <textarea
                name="notes"
                id="notes"
                cols="30"
                rows="10"
                placeholder="Additional notes to the client"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>

<button
              onClick={() => setShowInvoice(true)}
              className="mt-5 bg-blue-600 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
            >
              Preview Invoice
            </button> 
          </div>
          </>
        )}
      </main> 
    </>
  )
}

export default Billing
