import { ContactTemplate } from "@/features"
import { setRequestLocale } from "next-intl/server";
import { TPageProps } from "@/types";

export default async function ContactPage({ params }: TPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <ContactTemplate />
}