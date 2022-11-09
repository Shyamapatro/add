const Text = ({
    title,
    textStyle = 'text-3xl font-bold opacity-60 my-2',
}) => {
    return title ? <h1 className={textStyle}>{title}</h1> : null;
}

export default Text;