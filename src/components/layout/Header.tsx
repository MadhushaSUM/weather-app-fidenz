import Image from "next/image";

export default function Header() {
    return (
        <div className="flex flex-row justify-center items-center h-full">
            <div>
                <Image src="/weather-app-logo.png" alt="weather app logo" width={60} height={60} />
            </div>
            <div className="text-white text-xl font-semibold">
                Weather App
            </div>
        </div>
    );
}