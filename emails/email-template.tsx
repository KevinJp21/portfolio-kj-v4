import {
  Body,
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
import { TContactFormValues } from "@/features";

const Item = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;

  return (
    <table cellPadding={0} cellSpacing={0} width="100%" className="mb-3">
      <tr>
        <td style={{ padding: "14px 16px" }}>
          <Text className="m-0 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8b8472]">
            {label}
          </Text>
          <Text className="m-0 mt-2 text-[14px] leading-6 text-[#f4efe6]">
            {value}
          </Text>
        </td>
      </tr>
    </table>
  );
};

export default function ContactEmailTemplate(data: TContactFormValues) {
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
          Nuevo contacto de {data.name} · {data.interest}
        </Preview>
        <Body className="m-0 bg-[#07090c] px-6 py-12 font-sans text-[#f4efe6]">
          <Container className="mx-auto max-w-[600px] rounded-[24px] border border-rule bg-[#0b0e13] px-9 py-9">
            {/* Breadcrumb / header bar */}
            <Section className="border-b border-ruleSoft pb-4">
              <Text className="m-0 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8b8472]">
                KEVINJP.DEV{"  ·  "}
                <span className="text-[#7be3ff]">NUEVO CONTACTO</span>
              </Text>
            </Section>

            {/* Título con el nombre como acento, igual que la confirmación */}
            <Section className="mt-8">
              <Heading
                as="h1"
                className="m-0 text-[32px] font-normal leading-[1.05] text-[#f4efe6]"
                style={{ fontFamily: "Fraunces, Georgia, serif" }}
              >
                Te escribe{"\u00A0"}
                <span style={{ fontStyle: "italic", color: "#7be3ff" }}>
                  {data.name}
                </span>
                .
              </Heading>
              <Text className="m-0 mt-4 text-[15px] leading-7 text-[#c8c0af]">
                Nueva consulta desde el formulario de contacto de tu
                portfolio. Aquí está el resumen.
              </Text>
            </Section>

            {/* Resumen — tarjeta tipo "recibo", igual que el bloque de siguientes pasos */}
            <Section className="mt-8">
              <table
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{
                  border: "1px solid rgba(244,239,230,.10)",
                  borderRadius: "16px",
                }}
              >
                <tr>
                  <td style={{ padding: "20px 22px" }}>
                    <Text className="m-0 font-mono text-[10px] uppercase tracking-[0.24em] text-[#8b8472]">
                      RESUMEN
                    </Text>

                    <table width="100%" cellPadding={0} cellSpacing={0} className="mt-4">
                      <tr>
                        <td style={{ padding: "6px 0" }}>
                          <Text className="m-0 text-[13px] text-[#8b8472]">
                            Correo
                          </Text>
                        </td>
                        <td align="right" style={{ padding: "6px 0" }}>
                          <Text className="m-0 text-[13px] text-[#f4efe6]">
                            {data.email}
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "6px 0" }}>
                          <Text className="m-0 text-[13px] text-[#8b8472]">
                            Tipo de consulta
                          </Text>
                        </td>
                        <td align="right" style={{ padding: "6px 0" }}>
                          <Text className="m-0 text-[13px] text-[#7be3ff]">
                            {data.inquiryType}
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "6px 0" }}>
                          <Text className="m-0 text-[13px] text-[#8b8472]">
                            Interés
                          </Text>
                        </td>
                        <td align="right" style={{ padding: "6px 0" }}>
                          <Text className="m-0 text-[13px] text-[#f4efe6]">
                            {data.interest}
                          </Text>
                        </td>
                      </tr>
                      {data.budget && (
                        <tr>
                          <td style={{ padding: "6px 0" }}>
                            <Text className="m-0 text-[13px] text-[#8b8472]">
                              Presupuesto
                            </Text>
                          </td>
                          <td align="right" style={{ padding: "6px 0" }}>
                            <Text className="m-0 text-[13px] text-[#f4efe6]">
                              {data.budget}
                            </Text>
                          </td>
                        </tr>
                      )}
                      {data.timeline && (
                        <tr>
                          <td style={{ padding: "6px 0" }}>
                            <Text className="m-0 text-[13px] text-[#8b8472]">
                              Plazo estimado
                            </Text>
                          </td>
                          <td align="right" style={{ padding: "6px 0" }}>
                            <Text className="m-0 text-[13px] text-[#f4efe6]">
                              {data.timeline}
                            </Text>
                          </td>
                        </tr>
                      )}
                    </table>
                  </td>
                </tr>
              </table>
            </Section>

            {/* Descripción del proyecto */}
            <Section className="mt-6">
              <Text className="m-0 mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#8b8472]">
                DESCRIPCIÓN DEL PROYECTO
              </Text>
              <table
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{
                  border: "1px solid rgba(244,239,230,.10)",
                  borderRadius: "16px",
                }}
              >
                <tr>
                  <td style={{ padding: "18px 20px" }}>
                    <Text className="m-0 whitespace-pre-wrap text-[14px] leading-7 text-[#f4efe6]">
                      {data.brief}
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>

            {/* Firma */}
            <Section className="mt-9 border-t border-ruleSoft pt-6">
              <Text
                className="m-0 text-[20px] text-[#f4efe6]"
                style={{ fontFamily: "Fraunces, Georgia, serif", fontStyle: "italic" }}
              >
                Kevin Julio
              </Text>
              <Text className="m-0 mt-1 text-[13px] text-[#8b8472]">
                Systems Engineer · Frontend Developer
              </Text>
              <Text className="m-0 mt-5 text-[12px] leading-5 text-[#8b8472]">
                Notificación automática generada desde el formulario de
                contacto de kevinjp.dev.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}