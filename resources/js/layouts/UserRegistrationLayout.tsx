// resources/js/layouts/UserRegistrationLayout.tsx
import { ReactNode } from 'react';

export default function UserRegistrationLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen w-full bg-blue-200">
            {/* Header */}
            <div className="flex items-center justify-center gap-4 bg-white p-2">
                {/* Zambian Coat of Arms - Replace with your actual image path */}
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/28/Coat_of_arms_of_Zambia.svg"
                    alt="Zambian Coat of Arms"
                    className="h-16 w-auto"
                />
                <div className="text-center">
                    <h1 className="text-xl md:text-2xl font-bold text-blue-800">
                        Integrated Cervical Cancer Management System
                    </h1>
                    <p className="text-sm text-gray-600">
                        Ministry of Health, Zambia
                    </p>
                </div>

            </div>
            <div className="max-w-none p-4 md:p-8 lg:p-12">
                {children}
            </div>
        </div>
    );
}
