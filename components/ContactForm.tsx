"use client";

import { ValidationError, useForm } from "@formspree/react";
import { type FormEvent, useMemo, useState } from "react";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<FormValues>;

const initialValues: FormValues = {
  name: "",
  email: "",
  message: "",
};

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Please write a message of at least 10 characters.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, submitToFormspree] = useForm("mrpzzonj");

  const statusMessage = useMemo(() => {
    if (state.succeeded) {
      return {
        type: "success",
        text: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
      };
    }

    if (state.errors && Object.keys(state.errors).length > 0) {
      return {
        type: "error",
        text: "Something went wrong sending your message. Please try again or email me directly.",
      };
    }

    return null;
  }, [state.errors, state.succeeded]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await submitToFormspree(event);
    if (!state.errors) {
      setValues(initialValues);
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-600 dark:text-accent-400">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
            Have a role, project, or product challenge in mind?
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
            Send a quick note and I will get back to you. You can also reach me directly at{" "}
            <a
              href="mailto:rishankkesar111@gmail.com"
              className="font-semibold text-accent-600 underline underline-offset-4 transition hover:text-accent-500 dark:text-accent-400"
            >
              rishankkesar111@gmail.com
            </a>
            .
          </p>
        </div>

        <form
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
        >
          <div className="grid gap-5">
            <div className="grid gap-2">
              <label htmlFor="contact-name" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={values.name}
                onChange={(event) => {
                  setValues((current) => ({ ...current, name: event.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 dark:border-white/15 dark:bg-ink-950 dark:text-white"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name ? (
                <span id="name-error" className="text-sm text-red-500" role="alert">
                  {errors.name}
                </span>
              ) : null}
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
                className="text-sm text-red-500"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="contact-email" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Email <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={values.email}
                onChange={(event) => {
                  setValues((current) => ({ ...current, email: event.target.value }));
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 dark:border-white/15 dark:bg-ink-950 dark:text-white"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email ? (
                <span id="email-error" className="text-sm text-red-500" role="alert">
                  {errors.email}
                </span>
              ) : null}
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-sm text-red-500"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="contact-message" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Message <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                value={values.message}
                onChange={(event) => {
                  setValues((current) => ({ ...current, message: event.target.value }));
                  if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                }}
                className="resize-none rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 dark:border-white/15 dark:bg-ink-950 dark:text-white"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message ? (
                <span id="message-error" className="text-sm text-red-500" role="alert">
                  {errors.message}
                </span>
              ) : null}
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="text-sm text-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="inline-flex items-center justify-center rounded-md bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-ink-950"
            >
              {state.submitting ? "Sending..." : "Send message"}
            </button>

            {statusMessage ? (
              <p
                className={`text-sm font-medium ${
                  statusMessage.type === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
                }`}
                role="status"
              >
                {statusMessage.text}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
