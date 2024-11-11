import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone , FaGithub} from "react-icons/fa";
import Image from "next/image";
import { IoMail } from "react-icons/io5";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            {/* <h2 className="text-2xl font-bold mb-4">E-commerce</h2> */}
            <Link href="/" className="">
              <Image
                src="/img/logo.webp"
                alt="logo"
                width={50}
                height={50}
                priority
              />
            </Link>
            <p className="mb-4">
              We are dedicated to providing the best service to our customers.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/mohdsabir1" target="_blank"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaGithub size={24} />
                <span className="sr-only">Github</span>
              </a>
              {/* <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaTwitter size={24} />
                <span className="sr-only">Twitter</span>
              </a> */}
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaInstagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mohd-sabir-3b375323a/"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaLinkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            
            <p className="mb-2 flex gap-x-2 items-center"><FaPhone /> (+91) 9990-1140-29</p>
            <p className="flex gap-x-2 items-center"><IoMail /> moh.sabir.ali.54321@gmail.com</p>
          </div>

          {/* Newsletter Signup */}
          <div className="">
            <h3 className="text-lg font-semibold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <form className="flex flex-col  gap-5">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 mb-2 sm:mb-0 sm:mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>
            &copy; {new Date().getFullYear()}  All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
