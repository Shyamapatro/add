const Button = ({
    title,
    uppercase = false,
    height = 'h-full',
    width = 'w-full',
    borderRadius = 'rounded',
    backgroundColor = 'bg-secondary-blue',
    hoverBackgroundColor = 'hover:bg-blue-800',
    onClick,
    loading = false,
    label = '',
}) => {
    return (
        <>
            {
                title && loading ? <button onClick={onClick && onClick} className={`${backgroundColor} ${hoverBackgroundColor} btn loading duration-300 ${uppercase ? 'uppercase' : ''} text-white font-bold py-2 px-4 ${borderRadius} ${width} ${height} `}>
                    <label className="cursor-pointer">
                        {loading ? 'loading' : title}
                    </label>
                </button> : <button onClick={onClick && onClick} className={`${backgroundColor} ${hoverBackgroundColor} duration-300 ${uppercase ? 'uppercase' : ''} text-white font-bold py-2 px-4 ${borderRadius} ${width} ${height} `}>
                    <label htmlFor={label} className="cursor-pointer">
                        {title}
                    </label>
                </button>
            }

        </>
    );
}

export default Button;