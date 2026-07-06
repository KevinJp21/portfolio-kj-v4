"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { ScopeFrame, SectionHeader } from "@/components";
import { ContactField, ContactSummary, TContactFormValues } from "..";
import { MoveRight } from "lucide-react";



type ContactFormProps = {
  onSubmit: (data:TContactFormValues) => void;
};

export function ContactForm({ onSubmit }: ContactFormProps) {
  const t = useTranslations("ContactPage");
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } =
    useForm<TContactFormValues>({
      defaultValues: {
        name: "",
        email: "",
        brief: "",
        inquiryType: "",
        interest: "",
        budget: "",
        timeline: "",
      },
    });

  const watched = watch();
  const inquiryTypes = t.raw("inquiryTypes") as string[];
  const isCompany = watched.inquiryType === inquiryTypes[0];

  useEffect(() => {
    if (isCompany) {
      setValue("budget", "");
      setValue("timeline", "");
    }
  }, [isCompany, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-20 grid gap-12 md:grid-cols-12"
    >
      <div className="md:col-span-7">
        <SectionHeader code={t("brief.code")} eyebrow={t("brief.eyebrow")} />

        <div className="mt-8 space-y-8">
          <ContactField
            id="name"
            label={t("brief.nameLabel")}
            placeholder={t("brief.namePlaceholder")}
            required
            registration={register("name", { required: true })}
            error={errors.name ? t("errors.nameRequired") : undefined}
          />
          <ContactField
            id="email"
            label={t("brief.emailLabel")}
            type="email"
            placeholder={t("brief.emailPlaceholder")}
            required
            registration={register("email", { required: true })}
            error={errors.email ? t("errors.emailRequired") : undefined}
          />

          <ContactField
            id="inquiryType"
            label={t("brief.inquiryTypeLabel")}
            type="radio"
            registration={register("inquiryType", { required: true })}
            error={errors.inquiryType ? t("errors.inquiryTypeRequired") : undefined}
            options={t.raw("inquiryTypes") as string[]}
            selectedValue={watched.inquiryType}
          />

          <ContactField
            id="interest"
            label={t("brief.interestLabel")}
            type="radio"
            registration={register("interest", { required: true })}
            error={errors.interest ? t("errors.interestRequired") : undefined}
            options={t.raw("interests") as string[]}
            selectedValue={watched.interest}
          />

          <ContactField
            id="brief"
            label={t("brief.briefLabel")}
            placeholder={t("brief.briefPlaceholder")}
            type="textarea"
            registration={register("brief", { required: true })}
            error={errors.brief ? t("errors.briefRequired") : undefined}
          />
        </div>
      </div>

      <div className="md:col-span-5">
        <SectionHeader code={t("scope.code")} eyebrow={t("scope.eyebrow")} />

        <div className="mt-8 space-y-8">
          {!isCompany && (
            <>
              <ContactField
                id="budget"
                label={t("scope.budgetLabel")}
                type="radio"
                radioLayout="grid"
                registration={register("budget", { required: true })}
                error={errors.budget ? t("errors.budgetRequired") : undefined}
                options={t.raw("budgets") as string[]}
                selectedValue={watched.budget}
              />

              <ContactField
                id="timeline"
                label={t("scope.timelineLabel")}
                type="radio"
                radioLayout="list"
                registration={register("timeline", { required: true })}
                error={errors.timeline ? t("errors.timelineRequired") : undefined}
                options={t.raw("timelines") as string[]}
                selectedValue={watched.timeline}
              />
            </>
          )}

          <ScopeFrame className="rounded-2xl border border-rule bg-ink-850 p-6">
            <p className="chip-mono mb-3 text-bone-500">
              {t("scope.summaryLabel")}
            </p>
            <dl className="space-y-2 text-sm">
              <ContactSummary
                label={t("scope.summaryName")}
                value={watched.name || "—"}
              />
              <ContactSummary
                label={t("scope.summaryEmail")}
                value={watched.email || "—"}
              />
              <ContactSummary
                label={t("scope.summaryProject")}
                value={watched.interest || "—"}
              />
              {!isCompany && (
                <ContactSummary
                  label={t("scope.summaryBudget")}
                  value={watched.budget || "—"}
                />
              )}
              {!isCompany && (
                <ContactSummary
                  label={t("scope.summaryWhen")}
                  value={watched.timeline || "—"}
                />
              )}
            </dl>
          </ScopeFrame>

          <button
            type="submit"
            data-cursor="cta"
            data-cursor-label={t("form.submit")}
            className="group relative inline-flex w-full items-center justify-between gap-3 overflow-hidden rounded-full bg-bone-100 px-5 py-4 text-sm font-medium text-ink-900 transition-transform hover:scale-[1.01]"
          >
            <span className="relative z-10">{t("form.submit")}</span>
            <span className="relative z-10 flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-ink-700">
                /send
              </span>
              <span aria-hidden>
                <MoveRight className="size-3.5 stroke-2" />
              </span>
            </span>
            <span className="absolute inset-y-0 left-0 z-0 w-0 bg-signal transition-[width] duration-500 group-hover:w-full" />
          </button>
        </div>
      </div>
    </form>
  );
}