const TextInput = ({
    placeholder = "SEO Metadata",
    type = "text",
    marginVertical = "",
    inputType = "input",
    cols = "",
    rows = "",
    value,
    onChange,
    defaultValue,
}) => {
    return (
        <div className={`w-full ${marginVertical}`}>
            {
                inputType === "input" && <input
                    className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white shadow text-base"
                    id="grid-password"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            }
            {
                inputType === "textarea" && <textarea
                    placeholder={placeholder}
                    cols={cols}
                    rows={rows}
                    onChange={onChange}
                    defaultValue={defaultValue}
                    className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white shadow text-base"></textarea>
            }
        </div>
    );
}

export default TextInput;