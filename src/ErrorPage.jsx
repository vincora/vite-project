import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
  
    return (
      <div className="text-center p-20 space-y-3" data-testid='error-page'>
        <h1 className="text-2xl">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    );
  }