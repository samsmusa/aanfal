"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {Card, CardContent} from "@/components/ui/card";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";

export function MainCarousel() {
    const plugin = React.useRef(
        Autoplay({delay: 4000, stopOnInteraction: false})
    );

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
        >
            <CarouselContent className="flex"> {/* Ensure items are aligned horizontally */}
                {Array.from({length: 5}).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1 h-full">
                            <Card className="h-full">
                                <CardContent className="flex h-full items-center justify-center">
                                    <span className="text-4xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
