import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

const components: MDXComponents = {
    img: (props) => (
        <Image
            width={500}
            height={500}
            style={{ width: "100%", height: "auto" }}
            {...(props as ImageProps)}
            alt="image"
        />
    ),
};

export function useMDXComponents(): MDXComponents {
    return components;
}
