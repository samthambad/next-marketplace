import { FaSearch } from "react-icons/fa";
import { RiInfinityLine } from "react-icons/ri";
import { IoChatbubblesSharp } from "react-icons/io5";
import { IoAnalytics } from "react-icons/io5";
const Features = () => {
  return (
    <div className="py-16 overflow-hidden">
      <div className="container m-auto px-6 space-y-8 text-gray-800 md:px-12">
        <div className="mt-16 grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-4 xl:grid-cols-4">
          <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl dark:bg-inherit">
            <div className="relative p-8 space-y-8">
              <RiInfinityLine className="h-8 w-8 dark" />
              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                  Unlimited listings
                </h5>
                <p className="text-sm text-gray-600">
                  No restrictions to the number of listings.
                </p>
              </div>
            </div>
          </div>
          <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl dark:bg-inherit">
            <div className="relative p-8 space-y-8">
              <IoChatbubblesSharp className="h-8 w-8" />
              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                  Unrestricted Chat
                </h5>
                <p className="text-sm text-gray-600">
                  Chat using images/text.
                </p>
              </div>
            </div>
          </div>
          <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
            <div className="relative p-8 space-y-8">
              {/* import image from public */}
              <FaSearch className="h-8 w-8" />
              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                  Seamless Search
                </h5>
                <p className="text-sm text-gray-600">
                  Easily search for your desired listings.
                </p>
              </div>
            </div>
          </div>
          <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
            <div className="relative p-8 space-y-8">
              {/* import image from public */}
              <IoAnalytics className="h-8 w-8" />
              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                  Effortless Management
                </h5>
                <p className="text-sm text-gray-600">
                  Manage your listings in one place.
                </p>
              </div>
            </div>
          </div>
          {/* Repeat the above structure for the other features */}
        </div>
      </div>
    </div>
  );
};
export default Features;