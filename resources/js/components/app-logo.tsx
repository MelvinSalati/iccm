import logo from '../pages/assets/images/eCancer.png'

export default function AppLogo() {
    return (
        <>
            <style>{`
                @keyframes logoFloat {
                    0%,100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-3px);
                    }
                }

                .logo-animation {
                    animation: logoFloat 3s ease-in-out infinite;
                }
            `}</style>

            <div className="flex items-center gap-3">
                <img
                    src={logo}
                    alt="SGHPP-ECCIHIS"
                    className="
                        logo-animation
                        h-11
                        w-11
                        object-contain
                        transition-transform
                        duration-300
                        hover:scale-110
                    "
                />

                <div className="flex flex-col leading-tight">
                    <span className="font-semibold tracking-wide text-gray-900 dark:text-white">
                        SGHPP-ECCIHIS
                    </span>

                    <span className="text-[10px] uppercase tracking-widest text-gray-500">
                        Cervical Cancer Information System
                    </span>
                </div>
            </div>
        </>
    );
}
