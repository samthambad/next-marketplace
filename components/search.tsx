"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"; // for delaying function from executing

export default function Search({ placeholder }: { placeholder: string }) {
  // useSearchParams
  // /dashboard/invoices?page=1&query=pending would look like this: {page: '1', query: 'pending'}
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    //timer starts when starting typing and resets everytime term changes, 300ms after last change function runs
    const params = new URLSearchParams(searchParams); // Web API that provides utility methods for manipulating the URL query parameters
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    // updates the URL
    replace(`${pathname}?${params.toString()}`);
  }, 300);

return (
  <div className="w-[50%] mx-auto flex flex-1 flex-shrink-0 shadow-md hover:shadow-sm dark:hover:shadow-white relative">
    <label htmlFor="search" className="sr-only">
      Search
    </label>
    <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    <input
      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      placeholder={placeholder}
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
    />
  </div>
);
}
