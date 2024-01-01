import Categories from "@/components/shared/Categories";
import EventCards from "@/components/shared/EventCards";
import NoResults from "@/components/shared/NoResults";
import Pagination from "@/components/shared/Pagination";
import SearchBar from "@/components/shared/SearchBar";
import SwiperComponent from "@/components/shared/SwiperComponent";
import { getCategoryByName } from "@/lib/actions/category.action";
import { getEvents, getEventsByCategory } from "@/lib/actions/event.action";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function Home({ searchParams }: Props) {
  let events = [];
  let totalPages = 0;

  if (searchParams.category) {
    const category = await getCategoryByName(searchParams.category);

    events = await getEventsByCategory(category._id);
  } else {
    const result = await getEvents(
      searchParams.q ? searchParams.q : "",
      searchParams.page ? +searchParams.page : 1
    );
    events = result.events;
    totalPages = result.totalPages;
  }

  return (
    <>
      <SwiperComponent />
      <Categories />
      <h2 className="text-4xl max-sm:text-2xl font-bold text-center bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent mb-5">
        Trusted by Thousand of Events
      </h2>
      <div className="flex justify-center items-center mb-16">
        <SearchBar
          route="/"
          placeholder="Search title..."
          otherClasses="w-96"
        />
      </div>
      {events.length > 0 ? (
        <EventCards events={events} />
      ) : (
        <NoResults
          title={"No events found"}
          desc={""}
          // link={"/#categories"}
          // linkTitle={"Explore Events"}
        />
      )}
      <Pagination
        page={searchParams.page ? +searchParams.page : 1}
        totalPages={totalPages}
      />
    </>
  );
}
