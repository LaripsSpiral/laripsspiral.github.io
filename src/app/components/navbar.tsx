'use client';

import Link from "next/link";
import { IoHome, IoPersonOutline, IoFolderOpen, IoMailOutline } from "react-icons/io5";

export default function NavBar() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-neutral-700/80 backdrop-blur-sm shadow-sm z-50">

      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">

            <Link href="/" className="flex items-center px-3 py-2 hover:bg-neutral-600 rounded-lg transition-colors">
              <IoHome className="w-5 h-5" />
              <span className="ml-2">Home</span>
            </Link>

            <Link href="/about" className="flex items-center px-3 py-2 hover:bg-neutral-600 rounded-lg transition-colors">
              <IoPersonOutline className="w-5 h-5" />
              <span className="ml-2">About</span>
            </Link>

            <Link href="/projects" className="flex items-center px-3 py-2 hover:bg-neutral-600 rounded-lg transition-colors">
              <IoFolderOpen className="w-5 h-5" />
              <span className="ml-2">Projects</span>
            </Link>

            <Link href="/contact" className="flex items-center px-3 py-2 hover:bg-neutral-600 rounded-lg transition-colors">
              <IoMailOutline className="w-5 h-5" />
              <span className="ml-2">Contact</span>
            </Link>

          </div>
        </div>
      </div>

    </header>
  );
}
