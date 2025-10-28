"use client";
import Header from "@/app/ui/components/Header/page";
import Link from "next/link";
import { removePageAction } from "@/app/actions/removePage";

export default function ProfileClient({ pages }: { pages: Page[] }) {
  return (
    <div>
      <Header />
      <ul className="container mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {pages.map((page) => (
          <li
            key={page.id}
            className="
        group relative 
        bg-white dark:bg-zinc-900 
        border border-zinc-200 dark:border-zinc-800 
        rounded-2xl shadow-sm 
        hover:shadow-lg hover:-translate-y-1 
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        p-5
      "
          >
            <h3
              className="
          text-xl font-semibold mb-2 
          text-zinc-800 dark:text-zinc-100 
          group-hover:text-green-600 
          transition-colors duration-500 ease-in-out
        "
            >
              {page.title}
            </h3>
            <p
              className="
          text-sm text-zinc-500 dark:text-zinc-400 
          line-clamp-3 transition-all duration-700 ease-in-out
        "
            >
              {page.description}
            </p>

            <div className="flex gap-2 items-center mt-4">
              <form action={async () => await removePageAction(page.slug)}>
                <button
                  type="submit"
                  className="
              opacity-0 translate-y-2 
              group-hover:opacity-100 group-hover:translate-y-0 
              transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
              cursor-pointer
            "
                >
                  <span className="text-xs text-green-600 font-medium">
                    Remove
                  </span>
                </button>
              </form>

              <Link href={`/edit/${page.slug}`}>
                <div
                  className="
              opacity-0 translate-y-2 
              group-hover:opacity-100 group-hover:translate-y-0 
              transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
            "
                >
                  <span className="text-xs text-green-600 font-medium">
                    Edit
                  </span>
                </div>
              </Link>

              <Link href={`/${page.slug}`}>
                <div
                  className="
              opacity-0 translate-y-2 
              group-hover:opacity-100 group-hover:translate-y-0 
              transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
            "
                >
                  <span className="text-xs text-green-600 font-medium">
                    Check it →
                  </span>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
