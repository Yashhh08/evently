import Categories from "@/components/shared/Categories";
import SearchBar from "@/components/shared/SearchBar";
import SwiperComponent from "@/components/shared/SwiperComponent";

export default function Home() {
  return (
    <>
      <SwiperComponent />
      <Categories />
      <h2 className="text-4xl max-sm:text-2xl font-bold text-center bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent mb-5">
        Trusted by Thousand of Events
      </h2>
      <div className="flex justify-center items-center">
        <SearchBar
          route="/"
          placeholder="Search title..."
          otherClasses="w-96"
        />
      </div>
    </>
  );
}
