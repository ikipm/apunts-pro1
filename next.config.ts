import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: ["remark-gfm", "remark-math"],
        rehypePlugins: ["rehype-katex", "rehype-highlight", "rehype-slug"],
    },
});

export default withMDX(nextConfig);
