import {
  ChatBubbleBottomCenterIcon,
  EllipsisVerticalIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Page() {
  const users = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="flex gap-3">
      <div className="w-2/3 p-2 py-4">
        <div className="flex justify-end gap-3 mb-6">
          <div className="mt-3 flex -space-x-2 overflow-hidden items-center justify-center">
            {users.map(
              (item, key) =>
                key < 4 && (
                  <Image
                    key={key}
                    src="/images/person.png"
                    width={200}
                    height={100}
                    alt="users contribution"
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  />
                )
            )}
            {users.length > 4 && (
              <div className="flex h-6 w-6 rounded-full bg-slate-200 items-center justify-center">
                <p className="text-xs font-semibold">+{users.length - 4}</p>
              </div>
            )}
          </div>
          <button className="flex gap-1 font-medium items-center py-2 px-3 rounded bg-blue-500 text-white">
            Invites
          </button>
        </div>

        <div className="px-6 py-10 w-full h-52 rounded-t-xl bg-slate-100 flex items-end justify-between">
          <div className="flex justify-between w-full">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
              <h3 className="text-xl font-medium">Name Mesh</h3>
            </div>
            <div className="flex gap-6 text-sm">
              <div className="flex flex-col ">
                <small>CREATED</small>
                <p className="font-medium">Dec 3, 9:52PM</p>
              </div>
              <div className="flex flex-col">
                <small>DUE DATE</small>
                <p className="font-medium">JAN 24, 24:00PM</p>
              </div>
              <div className="flex flex-col">
                <small>TRACKED TIME</small>
                <p className="font-medium">5 days, 39 sec</p>
              </div>
            </div>
          </div>
        </div>

        <div className="inline-flex gap-4 items-center text-sm my-6 p-3 bg-slate-100 rounded">
          <button className="bg-purple-500 rounded py-1 px-2 text-white">
            Dashboard
          </button>
          <button>Timeline</button>
          <button>Calendar</button>
        </div>

        <div className="grid grid-cols-3">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <h3 className="font-medium">To do</h3>
                <div className="rounded-full bg-slate-200 w-6 h-6 flex items-center justify-center">
                  <small>4</small>
                </div>
              </div>
              <button>
                <PlusCircleIcon className="w-6" />
              </button>
            </div>

            <div className="p-3 pt-4 pl-5 bg-white w-full shadow rounded-xl space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">
                  Decompose the task of creating popups
                </h3>
                <button>
                  <EllipsisVerticalIcon className="w-8" />
                </button>
              </div>
              <p className="text-sm">
                It is necessarry to agree with the customer the required number
                of pop-ups
              </p>
              {users.map(
                (item, key) =>
                  key < 4 && (
                    <Image
                      key={key}
                      src="/images/person.png"
                      width={200}
                      height={100}
                      alt="users contribution"
                      className="inline-block h-4 w-4 rounded-full ring-2 ring-white"
                    />
                  )
              )}
              <hr />
              <div className="flex justify-between">
                <p className="py-1 px-2 text-xs rounded bg-purple-600 text-white">
                  Docs
                </p>
                <div className="flex gap-3">
                  <ChatBubbleBottomCenterIcon className="w-4 " />
                  <PaperAirplaneIcon className="w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 p-2 bg-slate-100"></div>
    </div>
  );
}
