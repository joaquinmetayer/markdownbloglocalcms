import Link from "next/link";
import "../admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <p>
        <Link href="/" target="_blank">
          Joaquin Metayer
        </Link>
        {" / "}
        <Link href="/admin">Admin</Link>
      </p>
      <hr />
      {children}
    </>
  );
}
