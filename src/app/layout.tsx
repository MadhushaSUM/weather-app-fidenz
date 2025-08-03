'use client';

import {Geist, Geist_Mono} from "next/font/google";
import {AntdRegistry} from '@ant-design/nextjs-registry';
import "./globals.css";
import {getQueryClient} from "@/providers/query-provider";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>
) {
    const queryClient = getQueryClient();

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AntdRegistry>
                    <QueryClientProvider client={queryClient}>
                        <div className="flex flex-col w-full min-h-screen h-full">
                            <div className="md:h-24 h-16">
                                <Header />
                            </div>
                            <div className="flex-grow">
                                {children}
                            </div>
                            <div className="md:h-24 h-16">
                                <Footer />
                            </div>
                        </div>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}
