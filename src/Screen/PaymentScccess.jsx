import { CheckCircleIcon } from '@heroicons/react/solid';

const PaymentSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex items-center justify-center mb-4">
                <CheckCircleIcon className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
            <p className="text-gray-500">Thank you for your purchase.</p>
        </div>
    );
};

export default PaymentSuccess;
