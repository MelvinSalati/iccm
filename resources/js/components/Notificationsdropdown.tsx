// components/NotificationsDropdown.tsx

import React, { useEffect, useRef, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import {
    Bell,
    FlaskConical,
    Pill,
    CalendarClock,
    Users,
    CheckCheck,
    Clock,
    ChevronRight,
} from 'lucide-react';
import Http from '@/utils/Http';

export type NotificationType =
    | 'lab_result'
    | 'treatment_pickup'
    | 'appointment_reminder'
    | 'referral'
    | 'follow_up'
    | 'general';

export interface PatientNotification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    patient_name?: string;
    patient_uuid?: string;
    is_read: boolean;
    created_at: string;
    action_url?: string;
}

interface PageProps {
    notifications?: PatientNotification[];
    [key: string]: any;
}

interface NotificationsDropdownProps {
    // Optional override — if omitted, notifications are read from Inertia shared props
    notifications?: PatientNotification[];
    // Where "View all" should navigate to
    viewAllUrl?: string;
}

const TYPE_META: Record<NotificationType, { icon: React.ElementType; classes: string }> = {
    lab_result: { icon: FlaskConical, classes: 'bg-violet-50 text-violet-600' },
    treatment_pickup: { icon: Pill, classes: 'bg-emerald-50 text-emerald-600' },
    appointment_reminder: { icon: CalendarClock, classes: 'bg-sky-50 text-sky-600' },
    referral: { icon: Users, classes: 'bg-amber-50 text-amber-600' },
    follow_up: { icon: Clock, classes: 'bg-orange-50 text-orange-600' },
    general: { icon: Bell, classes: 'bg-slate-100 text-slate-500' },
};

function formatRelativeTime(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-ZM', { month: 'short', day: 'numeric' });
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
                                                                                notifications,
                                                                                viewAllUrl = '/notifications',
                                                                            }) => {
    const { props } = usePage<PageProps>();
    const [items, setItems] = useState(notifications);
    const [isOpen, setIsOpen] = useState(false);
    const [markingAll, setMarkingAll] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Keep local state in sync if the page prop updates (e.g. after an Inertia reload)
    useEffect(() => {
        setItems(notifications ?? props.notifications ?? []);
    }, [notifications, props.notifications]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    const unreadCount = items.filter((n) => !n.is_read).length;

    const markAsRead = async (notification: PatientNotification) => {
        if (notification.is_read) return;

        setItems((prev) =>
            prev.map((n) => (n.id === notification.id ? { ...n, is_read: true } : n))
        );

        try {
            await Http.patch(`/notifications/${notification.id}/read`);
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        if (unreadCount === 0) return;
        setMarkingAll(true);

        setItems((prev) => prev.map((n) => ({ ...n, is_read: true })));

        try {
            await Http.post('/notifications/mark-all-read');
        } catch (error) {
            console.error('Failed to mark all notifications as read:', error);
        } finally {
            setMarkingAll(false);
        }
    };

    const handleNotificationClick = (notification: PatientNotification) => {
        markAsRead(notification);
        setIsOpen(false);
        if (notification.action_url) {
            router.visit(notification.action_url);
        } else if (notification.patient_uuid) {
            router.visit(`/patients/${notification.patient_uuid}`);
        }
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* Trigger */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative rounded-md border border-slate-200 bg-white p-1.5 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
                aria-label="Notifications"
            >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Overlay dropdown */}
            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-200 px-3.5 py-2.5">
                        <div className="flex items-center gap-1.5">
                            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Notifications
                            </h3>
                            {unreadCount > 0 && (
                                <span className="rounded-full bg-rose-50 px-1.5 py-0.5 text-[10px] font-medium text-rose-600 ring-1 ring-inset ring-rose-200">
                                    {unreadCount} new
                                </span>
                            )}
                        </div>
                        <button
                            onClick={markAllAsRead}
                            disabled={unreadCount === 0 || markingAll}
                            className="flex items-center gap-1 text-[11px] font-medium text-blue-600 transition-colors hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-300"
                        >
                            <CheckCheck className="h-3 w-3" />
                            Mark all read
                        </button>
                    </div>

                    {/* List */}
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                        {items.length > 0 ? (
                            items.map((notification) => {
                                const meta = TYPE_META[notification.type] ?? TYPE_META.general;
                                const Icon = meta.icon;
                                return (
                                    <button
                                        key={notification.id}
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`flex w-full items-start gap-2.5 px-3.5 py-2.5 text-left transition-colors hover:bg-slate-50 ${
                                            !notification.is_read ? 'bg-blue-50/40' : ''
                                        }`}
                                    >
                                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${meta.classes}`}>
                                            <Icon className="h-3.5 w-3.5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-1.5">
                                                <span className="truncate text-xs font-medium text-slate-900">
                                                    {notification.title}
                                                </span>
                                                {!notification.is_read && (
                                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                                                )}
                                            </div>
                                            <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                                                {notification.message}
                                            </p>
                                            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                                                {notification.patient_name && (
                                                    <>
                                                        <span className="truncate">{notification.patient_name}</span>
                                                        <span>·</span>
                                                    </>
                                                )}
                                                <span>{formatRelativeTime(notification.created_at)}</span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })
                        ) : (
                            <div className="px-3.5 py-8 text-center">
                                <Bell className="mx-auto h-7 w-7 text-slate-300" />
                                <p className="mt-2 text-xs text-slate-500">You're all caught up</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                router.visit(viewAllUrl);
                            }}
                            className="flex w-full items-center justify-center gap-1 border-t border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-800"
                        >
                            View all
                            <ChevronRight className="h-3 w-3" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationsDropdown;
