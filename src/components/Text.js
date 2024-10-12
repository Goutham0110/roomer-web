import "../styles/global.css"

export default function Text({ children, style, variant = "regular" }) {
    return (
        <p style={{ fontSize: "20px", display: "flex", ...style }} className={`poppins-${variant}`}>
            {children}
        </p>
    )
}