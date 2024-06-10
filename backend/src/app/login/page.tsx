"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faExclamation } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions";

export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="h-screen bg-slate-50">
      <div className="grid grid-cols-2 overflow-hidden mx-auto w-3/4 h-full">
        <div className="h-3/4 my-auto px-6 space-y-6">
          <Image
            width={75}
            height={75}
            src="/images/task_complition_remove.png"
            alt="DutyDirective Icon"
          />
          <h1 className="text-4xl capitalize font-semibold text-slate-800 leading-snug">
            <span className="text-purple-700 font-bold">manage</span> your{" "}
            <br /> task
            <span className="text-purple-700 font-bold"> easily</span>
          </h1>
          <form action={dispatch} className="space-y-4">
            <input
              type="text"
              name="email"
              placeholder="Email..."
              className="input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password..."
              className="input"
            />
            <button
              type="submit"
              className="button py-4 w-1/5 float-right bg-blue-500 text-white"
              aria-disabled={pending}
            >
              <FontAwesomeIcon icon={faArrowRight} className="size-5 mx-auto" />
            </button>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <FontAwesomeIcon icon={faExclamation} className="size-5" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </form>
        </div>
        <div className="h-full p-6">
          <div className="flex flex-col size-full rounded-xl bg-blue-400 overflow-hidden">
            <div className="flex-1 content-center rounded-b-xl bg-blue-100">
              <Image
                width={500}
                height={300}
                className="w-3/4 h-3/4 object-contain"
                src="/images/login_background.png"
                alt="DutyDirective Login background"
              />
            </div>
            <div className="py-2 bg-blue-400 w-full content-between px-6 text-white">
              <h3 className="font-semibold">
                Join the DutyDirective{" "}
                <span className="font-light">Network</span>
              </h3>
              <button className="button w-1/4 text-purple-700 bg-white capitalize">
                sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
