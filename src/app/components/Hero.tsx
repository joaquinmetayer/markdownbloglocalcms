"use client";
import Link from "next/link";
import data from "../../../assets/data.json";

export default function Hero() {
  return (
    <>
      <img
        src={`/images/${data.heroImage}`}
        alt="joaquinmetayer"
        style={{ width: `${data.heroWidth}`, paddingTop: "5px" }}
      />
      <p>
        <Link href="/">Joaquin Metayer</Link>
        {" / "}
        {data.links.map((link, index) => (
          <span key={index}>
            <Link key={index} href={link.url} target="_blank">
              {link.platform}
            </Link>{" "}
          </span>
        ))}
      </p>

      <hr />
    </>
  );
}
