export default function AppLogo() {
    return (
        <>
            <div className="flex size-9 items-center justify-center rounded-md bg-white p-1 shadow-sm ring-1 ring-sidebar-border">
                <img
                    src="/images/icons/logo.png"
                    alt="KH Equipment Hub"
                    className="max-h-full max-w-full object-contain"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    KH Equipment Hub
                </span>
            </div>
        </>
    );
}
