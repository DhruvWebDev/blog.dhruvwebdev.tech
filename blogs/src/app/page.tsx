import { NavbarDemo } from "@/components/header";
import { HeroParallaxDemo } from "@/components/hero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <NavbarDemo />
      <HeroParallaxDemo />
    </div>
  );
}
