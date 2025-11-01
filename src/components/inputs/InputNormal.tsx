type InputValue = string | number | undefined

interface InputNormal {
    type: "text" | "number" | "email" | "password"
    value: InputValue,
    onChange?: (value: InputValue) => void,
    classNameLabel?: string,
    classNameInput?: string,
    label?: string
    id?: string
}

export const InputNormal = ({ type, value, onChange, classNameInput, classNameLabel, label, id }: InputNormal) => {

    const changeInputValue = (value: InputValue) => {
        if (onChange) onChange(value)
    }
    return (
        <div className="relative">
            <label htmlFor={id} className={`absolute text-[16px] -mt-3 ml-2.5 px-2 ${classNameLabel} z-1`}>{label}</label>
            <input
                type={type}
                id={id}
                className={`bg-transparent rounded-2xl border-secondary border-2 outline-none text-foreground p-2.5 px-3 ${classNameInput}`}
                onChange={(e) => changeInputValue(e.target.value)}
            />
        </div>
    )
}