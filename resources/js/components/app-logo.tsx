import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <style>{`
                @keyframes logoFloat {
                    0%,100% {
                        transform: translateY(0px) rotate(0deg);
                        box-shadow: 0 0 0 rgba(37,99,235,.2);
                    }
                    50% {
                        transform: translateY(-4px) rotate(3deg);
                        box-shadow: 0 0 20px rgba(37,99,235,.45);
                    }
                }

                .logo-animation {
                    animation: logoFloat 3s ease-in-out infinite;
                }
            `}</style>

            <div className="flex items-center gap-3">
                <div
                    className="
                        logo-animation
                        flex h-10 w-10 items-center justify-center
                        rounded-lg
                        bg-blue-600
                        text-white
                        transition-all
                        duration-300
                        hover:scale-110
                        hover:rotate-6
                        hover:shadow-xl
                        cursor-pointer
                    "
                >
                    <AppLogoIcon className="size-5 fill-current" />
                </div>

                <div className="grid flex-1 text-left text-sm bg-blue-6000">
                    <span className="truncate font-semibold tracking-wide leading-tight">
                        SGHPP-ECCIHIS
                    </span>
                </div>
            </div>
        </>
    );
}
