import { QueueListIcon } from "@heroicons/react/24/outline";
import React from "react";
export default function Navbar() {
  return (
    <nav className="bg-black p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <QueueListIcon className="w-10 h-10 text-white" />
          <span className="text-3xl text-white ml-2">Todo App</span>
        </div>
        <div className="flex space-x-6 text-gray-300">
          <span className="cursor-pointer">Join our community</span>
          <span className="cursor-pointer">Sign In</span>
        </div>
      </div>
    </nav>
  );
}
