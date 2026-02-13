import ErrorBoundary from "../../ui/error-boundary/ErrorBoundary";
import PaginatedGameList from "../../ui/games-pagination/GamesPaginationServerSide";
import CreateProductForm from "../../ui/create-product-form/CreateProductForm";
import RandomJoke from "../../ui/random-joke/RandomJoke";
import UserProfileWithFetch from "../../user-profile/UserProfileWithFetch";

function FetchingDataPage() {
  return (
    <div>
      <ErrorBoundary>
        <CreateProductForm />
        <UserProfileWithFetch userId={1} />
        <PaginatedGameList />
        <RandomJoke />
      </ErrorBoundary>
    </div>
  );
}

export default FetchingDataPage;
