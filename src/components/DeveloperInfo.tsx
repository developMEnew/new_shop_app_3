'use client';

import { X } from 'lucide-react';

interface DeveloperInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeveloperInfoModal({ isOpen, onClose }: DeveloperInfoModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl z-50">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Developer Information</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg mb-2">About the Developer</h3>
              <p className="text-gray-600">
                Created by Develop M Enew, a passionate developer focused on creating intuitive and efficient web applications.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Project Details</h3>
              <p className="text-gray-600">
                Supershoptest01 is a modern inventory management system built with Next.js and MongoDB, featuring a clean and responsive user interface.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Technologies Used</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Next.js 14</li>
                <li>MongoDB</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Lucide Icons</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}