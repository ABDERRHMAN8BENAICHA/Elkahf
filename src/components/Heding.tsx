import { FC } from "react"
interface HeadingProps {
    title: string;
    isCentered?: boolean;
}
const Heding: FC<HeadingProps> = ({ title, isCentered = false }) => {
    return (
        <h1 className={`${isCentered ? "text-center" : "text-left"}  font-extrabold text-2xl md:text-5xl mt-8 text-nowrap bg-gradient-to-r  from-green-200 via-green-500 to-sky-200 bg-clip-text text-transparent p-2`}>
            {title}
        </h1>
    )
}

export default Heding