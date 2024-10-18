export default function Button({text, btnType = 'button', onClick, className}) {
    return (
        <button type={btnType} onClick={onClick} className={className}>
            {text}
        </button>
    )
}