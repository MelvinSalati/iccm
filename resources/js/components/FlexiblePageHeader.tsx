import {ChevronLeft, LucideIcon, UserPlus} from "lucide-react";

interface FlexiblePageHeaderProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    icon?: LucideIcon;
    iconColor?: string;
    iconBgColor?: string;
    showBackButton?: boolean;
    onBack?: () => void;
    backIcon?: LucideIcon;
    backButtonClassName?: string;
    actions?: React.ReactNode;
    headerClassName?: string;
    containerClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
}

function useNavigate() {

}

export function FlexiblePageHeader({
                                       title,
                                       subtitle,
                                       icon: Icon = UserPlus,
                                       iconColor = "text-white",
                                       iconBgColor = "from-blue-500 to-blue-600",
                                       showBackButton = true,
                                       onBack,
                                       backIcon: BackIcon = ChevronLeft,
                                       backButtonClassName = "p-2 hover:bg-gray-100 rounded-lg transition-colors",
                                       actions,
                                       headerClassName = "mb-8",
                                       containerClassName = "flex items-center gap-4",
                                       titleClassName = "text-2xl font-bold text-gray-900",
                                       subtitleClassName = "text-sm text-gray-500 mt-0.5"
                                   }: FlexiblePageHeaderProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    return (
        <div className={headerClassName}>
            <div className={containerClassName}>
                {showBackButton && (
                    <button
                        type="button"
                        onClick={handleBack}
                        className={backButtonClassName}
                        aria-label="Go back"
                    >
                        <BackIcon className="w-5 h-5 text-gray-600" />
                    </button>
                )}

                <div className="flex items-center gap-3">
                    <div className={`p-2.5 bg-gradient-to-br ${iconBgColor} rounded-xl shadow-lg`}>
                        <Icon className={`w-6 h-6 ${iconColor}`} />
                    </div>
                    <div>
                        <div className={titleClassName}>{title}</div>
                        {subtitle && <div className={subtitleClassName}>{subtitle}</div>}
                    </div>
                </div>

                {actions && (
                    <div className="ml-auto">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
}
