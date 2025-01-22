import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import SessionProviderPage from "@/providers/SessionProvider";

export default async function DahBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="w-full relative">
      <SessionProviderPage>
        <NavBar />
        {children}
        <div className="hidden md:block md:w-72 z-[80]">
          <SideBar />
        </div>
      </SessionProviderPage>
    </body>
  );
}
