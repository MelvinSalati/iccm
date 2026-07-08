import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';
import { Search, Bell, Plus, Loader2, SearchX } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import PatientSearch from "@/pages/patients/components/PatientSearch";

interface PatientResult {
    id: number | string;
    first_name: string;
    last_name: string;
    nrc?: string | null;
    phone?: string | null;
    [key: string]: unknown;
}

const MIN_CHARS = 2;
const DEBOUNCE_MS = 300;


export function PatientSidebarHeader({
                                     breadcrumbs = [],
                                 }: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-background px-4">
            {/* Left */}
            <div className="flex items-center gap-2">
                <SidebarTrigger />

                <div className="hidden md:block">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>



            {/* Right */}

        </header>
    );
}
