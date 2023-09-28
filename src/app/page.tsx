import { Button } from "@/components/ui/button";
// import Image from "next/image";
import logo from "../assets/logos/png/logo-no-background.png";
// import Image from "next/image"; Image shit
// <Image src={logo} alt="logo" className="object-cover" />
export default async function Home() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-t from-gray-200 via-gray-300 to-gray-500">
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 ">
        <div className="flex flex-col text-center items-center ">
          <div className="flex text-center">
            <h1 className="mr-3 text-5xl font-semibold">Better Ask PDF</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
