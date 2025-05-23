import React from 'react';
import { format } from 'date-fns';
import { Bill } from '../../types';
import { useReactToPrint } from 'react-to-print';
import { Printer } from 'lucide-react';

interface BillPrintProps {
  bill: Bill;
  onClose: () => void;
}

const BillPrint: React.FC<BillPrintProps> = ({ bill, onClose }) => {
  const componentRef = React.useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: onClose,
  });

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-800">Print Bill</h2>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 text-white bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700"
          >
            <Printer size={18} />
            Print
          </button>
        </div>

        <div className="mt-6" ref={componentRef}>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Park Management System</h1>
            <p className="text-gray-600">Bill Receipt</p>
          </div>

          <div className="border-b pb-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-800">Bill Number:</span>
              <span>{bill.billNumber}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-800">Date:</span>
              <span>{format(new Date(bill.createdAt), 'dd MMM yyyy, h:mm a')}</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Vehicle Number:</span>
              <span className="text-gray-800">{bill.vehicleNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Vehicle Type:</span>
              <span className="text-gray-800">{bill.vehicleType}</span>
            </div>

            {!bill.isParkingPass && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Entry Time:</span>
                  <span className="text-gray-800">{format(new Date(bill.entryTime), 'dd MMM yyyy, h:mm a')}</span>
                </div>
                {bill.exitTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exit Time:</span>
                    <span className="text-gray-800">{format(new Date(bill.exitTime), 'dd MMM yyyy, h:mm a')}</span>
                  </div>
                )}
                {bill.duration && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="text-gray-800">{bill.duration}</span>
                  </div>
                )}
              </>
            )}

            {bill.isParkingPass && bill.passDetails && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pass Duration:</span>
                  <span className="text-gray-800">{bill.passDetails.monthsDuration} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valid From:</span>
                  <span className="text-gray-800">{format(new Date(bill.passDetails.startDate), 'dd MMM yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valid Until:</span>
                  <span className="text-gray-800">{format(new Date(bill.passDetails.endDate), 'dd MMM yyyy')}</span>
                </div>
              </>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
              <span>Total Amount:</span>
              <span>₹{bill.amount}</span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Guard: {bill.guardName}</p>
            <p>Shift: {bill.shift}</p>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            <p>Thank you for using our parking service</p>
            <p>This is a computer-generated receipt</p>
          </div>
        </div>

        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillPrint;
