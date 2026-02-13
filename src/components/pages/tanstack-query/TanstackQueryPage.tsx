import AddTodoForm from "../../ui/create-todo/CreateTodo";
import ErrorBoundary from "../../ui/error-boundary/ErrorBoundary";
import RandomJokeWithQuery from "../../ui/random-joke/RandomJokeWithQuery";

function TanstackQueryPage() {
  return (
    <div>
      <ErrorBoundary>
        <RandomJokeWithQuery />
        <AddTodoForm />
      </ErrorBoundary>
    </div>
  );
}

export default TanstackQueryPage;
