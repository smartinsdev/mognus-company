import Link from "next/link";
import {
  MdMailOutline,
  MdOutlinePhone,
  MdOutlinePinDrop,
} from "react-icons/md";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-[#0c0a09] py-12">
      <div className="max-w-[1440px] px-6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:justify-items-center items-start">
        <div className="flex flex-col gap-4 md:col-span-2">
          <h2 className="text-neutral-100 text-2xl">Mognu&apos;s Company</h2>
          <p className="text-neutral-600 max-w-[50ch]">
            The company specializes in high-quality carpentry, with a focus on
            personalization and attention to detail.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-neutral-100 text-lg">Quick Links</h2>
          <Link
            href="#about"
            className="text-sm text-neutral-400 hover:underline hover:underline-offset-4"
          >
            About Us
          </Link>
          <Link
            href="#service"
            className="text-sm text-neutral-400 hover:underline hover:underline-offset-4"
          >
            Services
          </Link>
          <Link
            href="#project"
            className="text-sm text-neutral-400 hover:underline hover:underline-offset-4"
          >
            Projects
          </Link>
          <Link
            href="#contact"
            className="text-sm text-neutral-400 hover:underline hover:underline-offset-4"
          >
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-neutral-100 text-lg">Legal</h2>
          <Link
            href="#about"
            className="text-sm text-neutral-400 hover:underline hover:underline-offset-4"
          >
            Terms of Service
          </Link>
          <Link
            href="#service"
            className="text-sm text-neutral-400 hover:underline hover:underline-offset-4"
          >
            Privacy Policy
          </Link>
          <Link
            href="#project"
            className="text-sm text-neutral-400 hover:underline hover:underline-offset-4"
          >
            Cookie Policy
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-neutral-100 text-lg capitalize">Info</h2>
          <div className="flex items-center text-sm text-neutral-400 gap-2 mb-1">
            <MdMailOutline size={18} />
            <span>suport@mongnus.com</span>
          </div>
          <div className="flex items-center text-sm text-neutral-400 gap-2">
            <MdOutlinePinDrop size={18} />
            <span>
              N125, 8125 Quarteira
              <br />
              Portugal
            </span>
          </div>
          <div className="flex gap-4 text-neutral-200">
            <Link
              href="https://www.instagram.com/mognuscompany/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-950 transition-colors"
            >
              <span className="sr-only">Instagram Mognus Company</span>
              <FaInstagram size={18} />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=100093159309878"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-950 transition-colors"
            >
              <span className="sr-only">Facebook Mognus Company</span>

              <FaFacebook size={18} />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-t-neutral-900 pt-4 text-center text-xs text-muted-foreground">
        <p>&copy; 2024 Mognu&apos;s Company. All rights reserved.</p>
      </div>
    </footer>
  );
}
