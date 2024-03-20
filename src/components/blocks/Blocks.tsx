"use client";

import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { ScrollParallax } from "react-just-parallax";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";

export const CarouselDiv = Carousel;
export const MotionDiv = motion.div;
export const MotionP = motion.p;
export const MotionUl = motion.ul;
export const Parallax = ScrollParallax;
export const CldUploadBtn = CldUploadButton;
export const CldUploadWGT = CldUploadWidget;
