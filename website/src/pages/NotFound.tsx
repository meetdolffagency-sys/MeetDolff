import { Link } from "react-router-dom";
import { DolffMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="section flex min-h-[80svh] items-center pt-32">
      <div className="wrap">
        <DolffMark className="h-20 w-auto text-graphite" />
        <h1 className="t-h2 mt-8">That page isn't in the archive.</h1>
        <p className="t-lead muted-dark mt-4">The link may be old, or the page may never have existed.</p>
        <Link to="/" className="btn btn-primary mt-8">Back to home</Link>
      </div>
    </section>
  );
}
