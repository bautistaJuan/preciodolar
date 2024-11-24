const Loader = () => {
    return (
        <>
            <div className="flex items-center justify-center h-screen bg-black">
                <div className="relative">
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            className={`absolute w-16 h-8 bg-green-500 rounded-lg shadow-md flex items-center justify-center
                        animate-bounce ${index === 0 ? 'animate-delay-0' : index === 1 ? 'animate-delay-100' : 'animate-delay-200'}`}
                            style={{
                                top: `${index * -10}px`,
                                animationDuration: '1s',
                                animationIterationCount: 'infinite',
                            }}
                        >
                            <svg className="w-12 h-6 text-green-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor" />
                                <path d="M11.5 9.5V11.5H12.5V9.5H14C14.55 9.5 15 9.05 15 8.5V7C15 6.45 14.55 6 14 6H10C9.45 6 9 6.45 9 7V8.5C9 9.05 9.45 9.5 10 9.5H11.5Z" fill="currentColor" />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Loader