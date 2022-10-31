import dynamic from "next/dynamic";
import Unicorn from "../components/Unicorn";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  return (
    <div>
      <Unicorn />
      <Map />
    </div>
  );
}