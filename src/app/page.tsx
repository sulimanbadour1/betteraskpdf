import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../assets/logos/logo_png.png"; // Logo is a custom SVG file.
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { LogIn } from "lucide-react"; // Lucide is a set of open-source icons.
import FileUpload from "@/components/FileUpload";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-t from-gray-200 via-gray-300 to-gray-500">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex flex-col text-center items-center ">
          <Image
            src={logo}
            alt="logo"
            className="flex items-center w-24 mb-8"
          />

          <div className="flex text-center">
            <h1 className="mr-3 text-5xl font-semibold">Better Ask PDF</h1>
            <UserButton afterSignOutUrl="/" />
            {/* This is the Clerk sign out button. */}
          </div>
          <div className="flex mt-6 mb-6">
            {isAuth && <Button>Go to chats</Button>}
          </div>
          <p className="max-w-xl mt-1 text-lg text-slate-700">
            {" "}
            Dive into the world of{" "}
            <span className="font-bold text-slate-700">
              Better ask PDF
            </span>{" "}
            where millions of students,
            <br />
            researchers, and professionals transform their queries into
            discoveries!{" "}
          </p>
          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/signin">
                <Button>
                  Login to Start!
                  <LogIn size={20} className=" w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
          <blockquote className="text-xs mt-8 text-slate-700 italic">
            "Better Ask PDF: Where Curiosity Meets Clarity."
          </blockquote>
        </div>
      </div>
    </div>
  );
}
