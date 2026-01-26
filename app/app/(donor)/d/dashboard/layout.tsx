import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Donor Dashboard - K9Hope",
    description: "Manage your dog's blood donor profile",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
