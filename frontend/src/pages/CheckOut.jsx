import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';

function CheckOut({ plan }) {
    const { authUser } = useAuthContext()
    const [deliveryCharge, setdeliveryCharge] = useState('$0')
    const [formData, setFormData] = useState({
        name: authUser.name,
        email: authUser.email,
        country: '',
        city: '',
        phone: '',
        companyName: '',
        vat_number: '',
        voucher: '',
        deliveryMethod: 'Free Delivery - FedEx',
        paymentMethod: 'Credit Card'
    });
    const deliveryMethods = [
        { id: 'dhl', name: 'DHL Fast Delivery', price: '$15', description: 'Get it by Tommorow' },
        { id: 'fedex', name: 'Free Delivery - FedEx', price: '$0', description: 'Get it by Friday, 13 Dec 2023' },
        { id: 'express', name: 'Express Delivery', price: '$49', description: 'Get it today' }
    ];

    const paymentMethods = [
        { id: 'credit-card', name: 'Credit Card', description: 'Pay with your credit card' },
        { id: 'pay-on-delivery', name: 'Payment on delivery', description: '+$15 payment processing fee' },
        { id: 'paypal-2', name: 'Paypal account', description: 'Connect to your account' }
    ];
    const handlePaymentMethodChange = (name) => {
        setFormData({ ...formData, paymentMethod: name })
    }
    useEffect(() => {
        const d1 = deliveryMethods.filter((p) => {
            return p.name == formData.deliveryMethod
        })
        setdeliveryCharge(d1[0].price)
        // },[])
    }, [formData.deliveryMethod])
    const handleDeliveryMethodsChange = (name) => {
        setFormData({ ...formData, deliveryMethod: name })
    }
    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value })
    }
    const handleFormSubmit = async ()=>{
        e.preventDefault()
    }
    return (
        <>
            <section className="bg-white rounded-lg py-8 antialiased dark:bg-gray-900 md:py-16">
                <form onSubmit={()=>handleFormSubmit(e)} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Cart
                            </span>
                        </li>

                        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Checkout
                            </span>
                        </li>

                        <li className="flex shrink-0 items-center">
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Order summary
                        </li>
                    </ol>

                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Details</h2>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your name </label>
                                        <input type="text" id="name" value={formData.name} onChange={(e) => handleFormChange(e)} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your email* </label>
                                        <input type="email" id="email" value={formData.email} onChange={(e) => handleFormChange(e)} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="name@flowbite.com" required />
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-900 dark:text-white"> Country* </label>
                                        </div>
                                        <select id="country" defaultValue={"AU"} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                            <option value="US" >United States</option>
                                            <option value="AU">Australia</option>
                                            <option value="FR">France</option>
                                            <option value="ES">Spain</option>
                                            <option value="GB">United Kingdom</option>
                                        </select>
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label htmlFor="select-city-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> City* </label>
                                        </div>
                                        <select id="select-city-input-3" defaultValue={"CH"} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                            <option value="SF">San Francisco</option>
                                            <option value="NY">New York</option>
                                            <option value="LA">Los Angeles</option>
                                            <option value="CH">Chicago</option>
                                            <option value="HU">Houston</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number* </label>
                                        <div className="flex items-center">
                                            <div className="z-10 inline-flex cursor-default shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700" >
                                                <img className='h-4 w-6 mr-2 rounded-sm' src='https://img.freepik.com/free-vector/illustration-india-flag_53876-27130.jpg?ga=GA1.1.2134957458.1729403260&semt=ais_hybrid' />
                                                +91
                                            </div>
                                            <div className="relative w-full">
                                                <input type="text" id="phone" value={formData.phone} onChange={(e) => handleFormChange(e)} className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Email </label>
                                        <input type="email" id="email" value={formData.email} onChange={(e) => handleFormChange(e)} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="name@flowbite.com" required />
                                    </div>

                                    <div>
                                        <label htmlFor="companyName" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Company name </label>
                                        <input type="text" value={formData.companyName} onChange={(e) => handleFormChange(e)} id="companyName" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Flowbite LLC" required />
                                    </div>

                                    <div>
                                        <label htmlFor="vat_number" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> VAT number </label>
                                        <input type="text" id="vat_number" value={formData.vat_number} onChange={(e) => handleFormChange(e)} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="DE42313253" required />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                                            </svg>
                                            Add new address
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Payment</h3>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {paymentMethods.map((method) => (
                                        <div key={method.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                            <div className="flex items-start">
                                                <div className="flex h-5 items-center">
                                                    <input id={method.id} aria-describedby={`${method.id}-text`} type="radio" name="payment-method" value={method.name} className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked={method.default} onChange={() => handlePaymentMethodChange(method.name)} />
                                                </div>

                                                <div className="ms-4 text-sm">
                                                    <label htmlFor={method.id} className="font-medium leading-none text-gray-900 dark:text-white"> {method.name} </label>
                                                    <p id={`${method.id}-text`} className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">{method.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Methods</h3>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {deliveryMethods.map((method) => (
                                        <div key={method.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                            <div className="flex items-start">
                                                <div className="flex h-5 items-center">
                                                    <input id={method.id} aria-describedby={`${method.id}-text`} type="radio" name="delivery-method" value={method.name} className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked={method.default} onChange={() => handleDeliveryMethodsChange(method.name)} />
                                                </div>

                                                <div className="ms-4 text-sm">
                                                    <label htmlFor={method.id} className="font-medium leading-none text-gray-900 dark:text-white"> {method.price} - {method.name} </label>
                                                    <p id={`${method.id}-text`} className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">{method.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Enter a gift card, voucher or promotional code </label>
                                <div className="flex max-w-md items-center gap-4">
                                    <input type="text" id="voucher" value={formData.voucher} onChange={(e) => handleFormChange(e)} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                                    <button type="button" className="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply</button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                            <div className="flow-root">
                                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                                        {/* <dd className="text-base font-medium text-gray-900 dark:text-white">$8,094.00</dd> */}
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">${plan.pricepermonth}</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                        <dd className="text-base font-medium text-green-500">0</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                        {/* <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd> */}
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">${plan.pricepermonth * 0.08}</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Delivery Charges</dt>
                                        {/* <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd> */}
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">{deliveryCharge}</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Payment Processing Fee</dt>
                                        {/* <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd> */}
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">{formData.paymentMethod === "Payment on delivery" ? '$15' : '$0'}</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                        {/* <dd className="text-base font-medium text-gray-900 dark:text-white">$199</dd> */}
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">${plan.pricepermonth * 0.18}</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white">${plan.pricepermonth * 1.26}</dd>
                                    </dl>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Payment</button>

                                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">One or more items in your cart require an account. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Sign in or create an account now.</a>.</p>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default CheckOut