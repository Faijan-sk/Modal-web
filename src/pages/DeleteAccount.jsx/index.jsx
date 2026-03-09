import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useJwt from '../../endpoints/jwt/useJwt';
import { useAuth } from "../../context/AuthContext";

function DeleteAccount() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const { logout } = useAuth();
    const navigate = useNavigate();

    const BASE_URL = 'http://35.192.79.35';

    // const handleDelete = async (e) => {
    //     if (e) e.preventDefault();
        
    //     setError('');
    //     setSuccess('');

    //     // Confirmation dialog for safety
    //     if (!window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
    //         return;
    //     }

    //     try {
    //         setLoading(true);
    //         const response = await useJwt.deleteAccount();

    //         if (response.status === 200 || response.status === 201 || response.status === 204) {
    //             setSuccess(response.data?.message || 'Account deleted successfully');
                
    //             // Clear auth data and logout
    //             logout();

    //             // Auto redirect after 3 seconds to external URL
    //             setTimeout(() => {
    //                 window.location.href = `${BASE_URL}`;
    //             }, 3000);
    //         } else {
    //             setError(response.data?.detail || 'Failed to delete account');
    //         }
    //     } catch (err) {
    //         console.error("Delete Error:", err);
    //         const errorMessage = err.response?.data?.detail || 'Something went wrong. Please try again.';
    //         setError(errorMessage);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">

                <h1 className="text-4xl text-primary mb-6 font-bold">
                    Delete Your Drake Girl Account
                </h1>

                <p className="text-gray-700 mb-8 leading-relaxed">
                    At Drake Girl, we respect your privacy and provide you with the ability to permanently delete your account and associated personal data at any time.
                    You can delete your account using either the mobile application or the website.
                </p>

                {/* 01. Mobile App Section */}
                <section className="mb-8">
                    <h2 className="text-2xl text-primary mb-4 font-semibold">
                        Delete Your Account Using the Mobile App
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
                        <li>Open the Drake Girl mobile application.</li>
                        <li>Log in to your account.</li>
                        <li>Navigate to your <strong>Profile</strong> or <strong>Account Settings</strong>.</li>
                        <li>Tap on <strong>"Delete Account"</strong>.</li>
                        <li>Confirm the deletion request.</li>
                    </ul>
                </section>

                {/* 02. Website Section */}
                <section className="mb-8">
                    <h2 className="text-2xl text-primary mb-4 font-semibold">
                        Delete Your Account Using the Website
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
                        <li>
                            Visit{" "}
                            <a 
                                href={`${BASE_URL}/`}
                                className="text-primary underline font-medium" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                {`${BASE_URL}/`}
                            </a>
                        </li>
                        <li>Log in using your registered email address and password.</li>
                        <li>After logging in, you will be redirected to your <strong>Dashboard</strong>.</li>
                        <li>Go to the <strong>Profile</strong> section.</li>
                        <li>Click on <strong>"Delete Account"</strong>.</li>
                        <li>Confirm your deletion request.</li>
                    </ul>
                </section>

                {/* 03. Data Deletion */}
                <section className="mb-8">
                    <h2 className="text-2xl text-primary mb-4 font-semibold">
                        03. Data Deletion
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        When you delete your account, we will remove your profile information,
                        uploaded images, and associated personal data from our platform,
                        except where retention is required for legal or regulatory purposes.
                    </p>
                </section>

                {/* 04. Need Help */}
                <section className="mb-8">
                    <h2 className="text-2xl text-primary mb-4 font-semibold">
                        04. Need Help
                    </h2>
                    <p className="text-gray-700">
                        If you are unable to access your account or need assistance deleting your account,
                        please contact our support team:
                    </p>
                    <p className="text-gray-700 mt-2">
                        <span className="text-primary font-bold">Email:</span>{" "}
                        <a href="mailto:support@yourdomain.com" className="text-primary underline">
                            support@yourdomain.com
                        </a>
                    </p>
                </section>

                {/* --- API Response Message Area --- */}
                <div className="min-h-[60px] mb-4">
                    {success ? (
                        <div className="bg-green-100 text-green-700 p-3 rounded text-center border border-green-200 shadow-sm">
                            {success}. Redirecting to login...
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 text-red-700 p-3 rounded text-center border border-red-200 shadow-sm">
                            {error}
                        </div>
                    ) : (
                        <div className="invisible p-3">Placeholder</div>
                    )}
                </div>

                {/* Original Button Design Layout */}
                {/* <div className="flex justify-center mt-6">
                    {!success ? (
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className={`btn-drake-outline no-underline flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            style={{ cursor: 'pointer' }}
                        >
                            {loading ? 'Processing...' : 'Delete Account'}
                        </button>
                    ) : (
                        <a 
                            href={`${BASE_URL}/login`}
                            className="btn-drake-outline no-underline flex items-center justify-center"
                        >
                            Return to Login
                        </a>
                    )}
                </div> */}

            </div>
        </div>
    );
}

export default DeleteAccount;