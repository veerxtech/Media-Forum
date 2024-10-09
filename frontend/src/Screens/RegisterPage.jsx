import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import Navbar from '../Components/Navbar';




const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm();

    // Google auth Logic
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate


    // Function to check if the age is 18 or above
    const isAdult = (dob) => {
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDifference = today.getMonth() - dobDate.getMonth();

        // If birth date hasn't occurred this year yet, subtract 1 from age
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
            return age - 1 >= 18;
        }

        return age >= 18;
    };

    // Handle form submission
    function onSubmit(data) {
        console.log(data);
        navigate('/home'); // Navigate to HomePage after submission
    };
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-[70%] m-10">
                    <h2 className="text-3xl font-bold mb-6 text-center">Registration Form</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">Full Name <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                {...register('fullName', { required: 'Full Name is required' })}
                                placeholder='Enter Full Name'
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">Date of Birth
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="date"
                                {...register('dob', {
                                    required: 'Date of Birth is required',
                                    validate: (value) => isAdult(value) || 'You must be at least 18 years old',
                                })}
                                placeholder='Enter Age'
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">
                                Phone Number<span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="text"
                                {...register('phoneNumber', {
                                    required: 'Phone Number is required',
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: 'Phone Number must be 10 digits',
                                    },
                                })}
                                placeholder='Enter Phone Number'
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">
                                Email<span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Invalid email format',
                                    },
                                })}
                                placeholder='Enter Email'
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                                autoComplete='email'
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Pan Card Upload */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">
                                Pan Card Upload<span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="file"
                                accept=".pdf, .jpg, .jpeg, .png"
                                {...register('panCard', { required: 'Pan Card upload is required' })}
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.panCard && <p className="text-red-500">{errors.panCard.message}</p>}
                        </div>

                        {/* Aadhar Card Upload */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">
                                Aadhar Card Upload<span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="file"
                                accept=".pdf, .jpg, .jpeg, .png"
                                {...register('aadharCard', { required: 'Aadhar Card upload is required' })}
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.aadharCard && <p className="text-red-500">{errors.aadharCard.message}</p>}
                        </div>

                        {/* Username Field */}
                        <div className="relative">
                            {/* Label for Username */}
                            <label className="block mb-1 font-semibold text-start">
                                Username<span className='text-red-500'>*</span>
                            </label>

                            {/* Input for Username */}
                            <input
                                {...register('username', {
                                    required: 'Username is required',
                                    minLength: { value: 3, message: 'Username must be at least 3 characters long' }, // Optional: add minimum length validation
                                })}
                                placeholder="Enter Username"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                            />
                            {/* Display error for username field */}
                            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                        </div>


                        {/* Password Field */}
                        <div className="relative">
                            <label className="block mb-1 font-semibold text-start">
                                Password<span className='text-red-500'>*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                    })}
                                    placeholder="Enter Password"
                                    className="w-full border border-gray-300 p-2 pr-10 focus:outline-none focus:border-black"
                                    autoComplete="new-password"
                                />
                                <span
                                    className="absolute right-3 top-2 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <i className="ri-eye-line"></i>
                                    ) : (
                                        <i className="ri-eye-off-line"></i>
                                    )}
                                </span>
                            </div>
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="relative">
                            <label className="block mb-1 font-semibold text-start">
                                Confirm Password<span className='text-red-500'>*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register('confirmPassword', {
                                        required: 'Confirm Password is required',
                                        validate: (value) =>
                                            value === watch('password') || 'Passwords do not match', // Validation to check if passwords match
                                    })}
                                    placeholder="Confirm Password"
                                    className="w-full border border-gray-300 p-2 pr-10 focus:outline-none focus:border-black"
                                    autoComplete="new-password"
                                />
                                <span
                                    className="absolute right-3 top-2 cursor-pointer"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <i className="ri-eye-line"></i>
                                    ) : (
                                        <i className="ri-eye-off-line"></i>
                                    )}
                                </span>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                        </div>


                        {/* Street Address Field */}
                        <div className="relative">
                            <label className="block mb-1 font-semibold text-start">
                                Street Address<span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="text"
                                {...register('streetAddress', { required: 'Street Address is required' })} // Validation for required field
                                placeholder="Enter House Number and Street Name"
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {/* Display error for street address field */}
                            {errors.streetAddress && <p className="text-red-500">{errors.streetAddress.message}</p>}
                        </div>

                        {/* Town / City Field */}
                        <div className="relative mt-4">
                            <label className="block mb-1 font-semibold text-start">
                                Town / City<span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="text"
                                {...register('city', { required: 'Town/City is required' })} // Validation for required field
                                placeholder="Enter Town / City"
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {/* Display error for city field */}
                            {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                        </div>

                        {/* State Dropdown */}
                        <div className="relative mt-4">
                            <label className="block mb-1 font-semibold text-start">
                                State<span className='text-red-500'>*</span>
                            </label>
                            <select
                                {...register('state', { required: 'State is required' })} // Validation for required field
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            >
                                <option value="">Select State</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                            </select>
                            {/* Display error for state field */}
                            {errors.state && <p className="text-red-500">{errors.state.message}</p>}
                        </div>

                        {/* Pincode Field */}
                        <div className="relative mt-4">
                            <label className="block mb-1 font-semibold text-start">
                                Pincode<span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="text"
                                {...register('pincode', { required: 'Pincode is required', pattern: { value: /^[1-9][0-9]{5}$/, message: 'Invalid Pincode' } })} // Validation for pincode
                                placeholder="Enter Pincode"
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {/* Display error for pincode field */}
                            {errors.pincode && <p className="text-red-500">{errors.pincode.message}</p>}
                        </div>

                        {/* Nominee Name Field */}
                        <div className="relative">
                            {/* Label for Nominee Name */}
                            <label className="block mb-1 font-semibold text-start">
                                Nominee Name<span className='text-red-500'>*</span>
                            </label>

                            {/* Input for Nominee Name */}
                            <input
                                {...register('nomineeName', {
                                    required: 'Nominee Name is required',
                                })}
                                placeholder="Wife, Father, Mother etc."
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                            />
                            {/* Display error for nominee name field */}
                            {errors.nomineeName && <p className="text-red-500">{errors.nomineeName.message}</p>}
                        </div>

                        {/* Sponsor ID Field */}
                        <div className="relative">
                            {/* Label for Sponsor ID */}
                            <label className="block mb-1 font-semibold text-start">
                                Sponsor ID<span className='text-red-500'>*</span>
                            </label>

                            {/* Input for Sponsor ID */}
                            <input
                                {...register('sponsorID', {
                                    required: 'Sponsor ID is required',
                                })}
                                placeholder="Enter Sponsor ID"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                            />
                            {/* Display error for sponsor ID field */}
                            {errors.sponsorID && <p className="text-red-500">{errors.sponsorID.message}</p>}
                        </div>


                        {/* Buttons */}
                        <div className="flex space-x-4 justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 w-32 rounded text-white p-2 hover:bg-blue-600"
                                disabled={isSubmitting}
                                value={isSubmitting ? "Submitting" : "Submit"}
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="bg-gray-500 w-32 rounded text-white p-2 hover:bg-gray-600"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <hr />
            <button onClick={() => login()}>Sign in with Google 🚀</button>
        </>
    );
};

export default RegisterPage