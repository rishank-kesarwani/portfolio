"use client";

import { ValidationError, useForm } from "@formspree/react";
import { SubmitEvent, useMemo, useState } from "react";

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

function validateForm(values: FormValues) {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.message.trim().length < 20) {
    errors.message = "Please write at least 20 characters.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, submitToFormspree] = useForm("mrpzzonj");

  const statusMessage = useMemo(() => {
    if (state.succeeded) {
      return "Thanks. Your message has been sent.";
    }

    if (state.errors) {
      return "Something went wrong. Please try again or email me directly.";
    }

    return "";
  }, [state.errors, state.succeeded]);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await submitToFormspree(event);
    setValues(initialValues);
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
            Send a quick note and I will get back to you. You can also reach me at
            {" "}
            <a
              href="mailto:rishankkesar111@gmail.com"
              className="font-semibold text-accent-600 dark:text-accent-400"
            >
              rishankkesar111@gmail.com
            </a>
            .
          </p>
        </div>

        <form
          className="rounded-lg border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Name</span>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
                className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 dark:border-white/15 dark:bg-ink-950 dark:text-white"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name ? <span id="name-error" className="text-sm text-red-500">{errors.name}</span> : null}
              <ValidationError
                field="name"
                errors={state.errors}
                className="text-sm text-red-500"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
                className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 dark:border-white/15 dark:bg-ink-950 dark:text-white"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email ? <span id="email-error" className="text-sm text-red-500">{errors.email}</span> : null}
              <ValidationError
                field="email"
                errors={state.errors}
                className="text-sm text-red-500"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Message</span>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))}
                className="resize-none rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 dark:border-white/15 dark:bg-ink-950 dark:text-white"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message ? (
                <span id="message-error" className="text-sm text-red-500">{errors.message}</span>
              ) : null}
              <ValidationError
                field="message"
                errors={state.errors}
                className="text-sm text-red-500"
              />
            </label>

            <button
              type="submit"
              disabled={state.submitting}
              className="inline-flex items-center justify-center rounded-md bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state.submitting ? "Sending..." : "Send message"}
            </button>

            <ValidationError errors={state.errors} className="text-sm text-red-500" />

            {statusMessage ? (
              <p className="text-sm text-slate-600 dark:text-slate-300" role="status">
                {statusMessage}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
