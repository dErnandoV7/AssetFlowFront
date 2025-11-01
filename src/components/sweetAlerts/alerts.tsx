import Swal from "sweetalert2";
import withReactContent, { SweetAlertReactContent } from "sweetalert2-react-content";
import { ReactNode } from "react"; // Use ReactNode para tipar elementos JSX/React

// Corrigido: Tipar MySwal para garantir que os métodos do React Content estejam disponíveis
const MySwal: SweetAlertReactContent = withReactContent(Swal);

interface AlertOptions {
    title?: string;
    // O texto de entrada pode ser string ou um ReactNode (o que inclui JSX.Element)
    text?: string | ReactNode; 
    timer?: number;
}

// 1. Corrigido: A tipagem de retorno deve ser ReactNode e a chave deve ser única (key)
const textList = (msgs: string[]): ReactNode => {
    return (
        <div className="flex flex-col ">
            {msgs && msgs.map((txt, index) => (
                <p key={index}>{txt}</p>
            ))}
        </div>
    )
}

const Alerts = {
    success: ({ title = "Sucesso!", text = "", timer = 2000 }: AlertOptions = {}) => {
        MySwal.fire({
            title,
            text, 
            icon: "success",
            background: "background",
            color: "white",
            confirmButtonColor: "#10b981",
            timer,
            timerProgressBar: true,
            showConfirmButton: false,
        });
    },

    // Alert de erro
    error: ({ title = "Erro!", text = "", timer = 3000 }: AlertOptions = {}) => {
        const textAsString = String(text);

        const shouldBeList = textAsString.includes(";");

        const alertText = shouldBeList
            ? textList(textAsString.split(";").map(t => t.trim()).filter(t => t !== ''))
            : textAsString;

        const isString = typeof alertText === 'string';

        MySwal.fire({
            title,
            ...(isString ? { text: alertText } : { html: alertText }),
            icon: "error",
            background: "background",
            color: "white",
            confirmButtonColor: "#ef4444",
            timer,
            timerProgressBar: true,
            showConfirmButton: true,
        });
    },
};

export default Alerts;