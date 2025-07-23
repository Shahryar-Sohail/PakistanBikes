import React from 'react'
import { motion } from "motion/react"

const Navbar = () => {
    return (

        <div>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1 }}
                className="navbar bg-green-300 shadow-sm"
            >
                <div className="navbar bg-green-300 shadow-sm">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li><a>Home</a></li>
                                <li><a>Comparison</a></li>
                                <li><a>Sales</a></li>
                                <li><a>About</a></li>
                                <li><a>Contact</a></li>
                            </ul>
                        </div>
                        <a className="btn btn-ghost text-xl">daisyUI</a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                                <li><a>Home</a></li>
                                <li><a>Comparison</a></li>
                                <li><a>Sales</a></li>
                                <li><a>About</a></li>
                                <li><a>Contact</a></li>
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <a className="btn bg-green-400">Admin</a>
                    </div>
                </div>
            </motion.div>


        </div>
    )
}

export default Navbar
