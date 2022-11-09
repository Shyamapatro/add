import {
    Field,
    ErrorMessage
} from "formik";

export const Email = () => {
    const email = (
        <>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="p" />
        </>
    );
    return email;
}

export const Password = () => {
    const password = (
        <>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="p" />
        </>
    );
    return password;
}

export const Input = ({
    name,
    type = "text",
    textarea = false,
    placeholder = "",
    marginVertical = "",
    onChange = "",
    value = ""
}) => {
    const input = (
        <>
            <Field className={`${marginVertical} appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white shadow text-base`}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                as={textarea ? "textarea" : null}
                placeholder={placeholder}
            />
            <ErrorMessage name={name} component="p" />
        </>
    );
    return input;
}

export const Select = ({
    name,
    data,
    marginVertical = "",
    onChange = "",
}) => {
    const select = (
        <>
            <div class={`${marginVertical} form-control w-full`}>
                <Field
                    onChange={onChange}
                    name={name}
                    as="select"
                    className="select select-bordered block w-full bg-white-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white shadow" >
                    {
                        data.map((item, index) => {
                            return <option key={index} selected={item.selected} value={item.value}>{item.label}</option>
                        })
                    }
                </Field>
            </div>
            <ErrorMessage name={name} component="p" />
        </>
    );
    return select;
}

export const Radio = ({ name, data }) => {
    const radio = (
        <>
            {
                data.map((item, index) => {
                    return (
                        <>
                            <div className="flex gap-2 items-center" key={index}>
                                <Field name={name} value={item.value} type="radio" />
                                <label>{item.label}</label>
                            </div>
                        </>
                    )
                })
            }
            <ErrorMessage name={name} component="p" />
        </>
    );
    return radio;
}

export const Checkbox = ({ name, value, label, ...rest }) => {
    const checkbox = (
        <>
            <div className="flex gap-2 items-center">
                <Field type="checkbox" name={name} value={value} {...rest} />
                <label>{label}</label>
            </div>
            <ErrorMessage name={name} component="p" />
        </>
    );
    return checkbox;
}