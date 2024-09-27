"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Text, Float } from '@react-three/drei'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FaGoogle } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
// import { BaseApiUrl } from '@/utils/constanst'

import { toast } from "sonner";

export default function SignupForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userName: '',
        firstname: '',
        lastname: '',
    })
    const [isFormValid, setIsFormValid] = useState(false)
    const router = useRouter()

    useEffect(() => {
        validateForm()
    }, [formData])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const validateForm = () => {
        const {
            email,
            password,
            userName,
            lastname,
            firstname
        } = formData

        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        const isPasswordValid = password.length >= 8


        setIsFormValid(isEmailValid && isPasswordValid && userType && userName && lastname && firstname)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isFormValid) {
            console.log(formData);
            // const { username, email, password, role, firstname, lastname } = req.body
            let { email, password, userName, userType, firstname, lastname } = formData
            const response = await fetch(`${BaseApiUrl}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password, role: userType, username: userName, firstname: firstname, lastname: lastname })
            });
            const json = await response.json();

            if (json) {

                localStorage.setItem('email', email)
                toast.success("Otp send successfully");
                router.push("/otp")
            } else {
                toast.error("Error to Create");
            }
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-5 my-4"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">Create Your Account</h2>
                <p className="text-center text-gray-600 mb-3 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        SIGN IN
                    </Link>
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <Label htmlFor="userName" className="text-sm">UserName</Label>
                        <Input
                            id="userName"
                            name="userName"
                            placeholder="Enter your Username"
                            type="text"
                            value={formData.userName}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-sm">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" className="text-sm">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="firstname" className="text-sm">First Name</Label>
                        <Input
                            id="firstname"
                            name="firstname"
                            placeholder="Enter your First Name"
                            type="text"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="lastname" className="text-sm">Last Name</Label>
                        <Input
                            id="lastname"
                            name="lastname"
                            placeholder="Enter your Last Name"
                            type="text"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                        />
                    </div>

                    <Button
                        className="w-full"
                        type="submit"
                        disabled={!isFormValid}
                    >
                        SIGN UP
                    </Button>
                </form>
                <p className="mt-3 text-xs text-center text-gray-500">
                    By clicking Sign Up you agree to our{" "}
                    <a href="/terms" className="text-blue-500 hover:underline">
                        Terms of Service
                    </a>{" "}
                    &{" "}
                    <a href="/privacy" className="text-blue-500 hover:underline">
                        Privacy Policy
                    </a>
                </p>
                <p className="mt-2 text-center text-xs">
                    <Link href="/" className="text-blue-500 hover:underline">
                        Continue without signup?{" "}
                        <span className="text-gray-600">EXPLORE</span>
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}