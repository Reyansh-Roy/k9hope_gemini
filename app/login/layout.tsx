import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login - K9Hope Canine Blood Network",
    description: "Access K9Hope platform for canine blood donation management",
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
