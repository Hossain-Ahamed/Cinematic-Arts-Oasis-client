import React from 'react';
import ResetButton from './ResetButton';
import toast from 'react-hot-toast';

const SuccessfullPage = ({ id, reset, transactionID }) => {

    const handleCopyClick = (data) => {
        if (navigator.clipboard) {
          if (data) {
            navigator.clipboard
              .writeText(data)
              .then(() => {
                toast.success("Copied to clipboard");
              })
              .catch((error) => {
                console.error("Failed to copy : ", error);
              });
          }
        } else {
          console.error("Clipboard API is not available in this environment");
        }
      };
      
    return (
        <div className="Result select-none">
            <div className="ResultTitle" role="alert">
                Payment successful
            </div>
            <div className="ResultMessage">
                Thanks for trying Stripe Elements. No money was charged, but we
                generated a <br />
                PaymentMethod:  <span onClick={()=>handleCopyClick(id)} className='cursor-pointer hover:underline' title='click to copy'>{id} </span><br />
                transaction ID : <span onClick={()=>handleCopyClick(transactionID)} className='cursor-pointer hover:underline' title='click to copy'>{transactionID}</span>
            </div>
            <ResetButton onClick={reset} />
        </div>
    );
};

export default SuccessfullPage;