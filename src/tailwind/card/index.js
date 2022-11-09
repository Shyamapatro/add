const Card = ({
    children,
    title,

}) => {
    return (
        <div className="bg-white drop-shadow-md w-full border-2 py-3 mb-5 overflow-scroll">
            {title && <><h6 className="px-3">{title}</h6> <hr className="my-2.5 border" /></>}
            <div className="px-3">{children}</div>
        </div>
    );
}

export default Card;