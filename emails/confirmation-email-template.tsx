import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from "react-email";

type Translator = (
  key: string,
  values?: Record<string, string | number>
) => string;

type ConfirmationEmailTemplateProps = {
  name: string;
  t: Translator;
  locale: 'es' | 'en';
};

export default function ConfirmationEmailTemplate({
  name, t, locale
}: ConfirmationEmailTemplateProps) {
  const firstName = name?.trim().split(/\s+/)[0] ?? "";

  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
        theme: {
          extend: {
            colors: {
              ink900: "#07090c",
              ink850: "#0b0e13",
              ink800: "#10131a",
              bone100: "#f4efe6",
              bone300: "#c8c0af",
              bone400: "#8b8472",
              signal: "#7be3ff",
              rule: "rgba(244,239,230,.10)",
              ruleSoft: "rgba(244,239,230,.06)",
            },
          },
        },
      }}
    >
      <Html>
        <Head />
        <Preview>
          {t("confirmation.preview", { firstName })}
        </Preview>
        <Body className="m-0 bg-[#07090c] px-6 py-12 font-sans text-[#f4efe6]">
          <Container className="mx-auto max-w-[600px] rounded-[24px] border border-rule bg-[#0b0e13] px-9 py-9">
            {/* Breadcrumb */}
            <Section className="border-b border-ruleSoft pb-4">
              <Text className="m-0 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8b8472]">
                KEVINJP.DEV{"  ·  "}
                <span className="text-[#7be3ff]">
                  {t("confirmation.badge")}
                </span>
              </Text>
            </Section>

            <Section className="mt-8">
              <Heading
                as="h1"
                className="m-0 text-[32px] font-normal leading-[1.05] text-[#f4efe6]"
                style={{ fontFamily: "Fraunces, Georgia, serif" }}
              >
                {t("confirmation.title")},{"\u00A0"}
                <span style={{ fontStyle: "italic", color: "#7be3ff" }}>
                  {firstName}
                </span>
                .
              </Heading>

              <Text className="m-0 mt-4 text-[15px] leading-7 text-[#c8c0af]">
                {t("confirmation.description")}
              </Text>
            </Section>

            <Section className="mt-8 text-center">
              <Button
                href={`https://kevinjp.dev/${locale}`}
                className="relative inline-flex items-center justify-between gap-3 overflow-hidden rounded-full bg-[#f4efe6] px-5 py-4 text-sm font-medium text-[#07090c]"
              >
                {t("confirmation.cta.label")}
              </Button>
            </Section>

            <Section className="mt-6 text-center">
              <Text className="m-0 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8b8472]">
                <a
                  href={`https://kevinjp.dev/${locale}/blog`}
                  className="text-[#7be3ff] no-underline"
                >
                  {t("confirmation.links.blog")}
                </a>

                {"   ·   "}

                <a
                  href="https://linkedin.com/in/kevinjulio"
                  className="text-[#7be3ff] no-underline"
                >
                  {t("confirmation.links.linkedin")}
                </a>

                {"   ·   "}

                <a
                  href="https://github.com/KevinJp21"
                  className="text-[#7be3ff] no-underline"
                >
                  {t("confirmation.links.github")}
                </a>
              </Text>
            </Section>

            <Section className="mt-9 border-t border-ruleSoft pt-6">
              <Text
                className="m-0 text-[20px] text-[#f4efe6]"
                style={{
                  fontFamily: "Fraunces, Georgia, serif",
                  fontStyle: "italic",
                }}
              >
                {t("confirmation.footer.name")}
              </Text>

              <Text className="m-0 mt-1 text-[13px] text-[#8b8472]">
                {t("confirmation.footer.role")}
              </Text>

              <Text className="m-0 mt-5 text-[12px] leading-5 text-[#8b8472]">
                {t("confirmation.footer.note")}
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
