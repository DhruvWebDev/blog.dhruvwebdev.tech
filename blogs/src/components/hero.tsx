"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { products } from "@/lib/utils";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
