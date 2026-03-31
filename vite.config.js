import { copyFileSync, cpSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { defineConfig } from "vite";

const staticDistFiles = [
    "CNAME",
    "robots.txt",
    "sitemap.xml",
    "llms.txt",
    ".nojekyll"
];

function copyRootFilesToDist() {
    return {
        name: "copy-root-files-to-dist",
        apply: "build",
        writeBundle(options) {
            const outDir = resolve(__dirname, options.dir ?? "dist");

            for (const relativePath of staticDistFiles) {
                const sourcePath = resolve(__dirname, relativePath);
                const targetPath = resolve(outDir, relativePath);
                mkdirSync(dirname(targetPath), { recursive: true });
                copyFileSync(sourcePath, targetPath);
            }

            cpSync(resolve(__dirname, "assets"), resolve(outDir, "assets"), {
                recursive: true
            });
        }
    };
}

export default defineConfig({
    build: {
        rolldownOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                support: resolve(__dirname, "support/index.html"),
                privacy: resolve(__dirname, "privacy/index.html")
            }
        }
    },
    plugins: [copyRootFilesToDist()]
});
