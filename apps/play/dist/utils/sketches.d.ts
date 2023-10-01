/**
 * Load Sketches data from '@fat-fuzzy/lib'
 */
export declare const fetchSketchesData: () => Promise<{
    sketches: any;
} | undefined>;
/**
 * Load Sketches data from markdown files contained in 'src/data/sketches'
 *
 * @returns { meta, path } frontmatter metadata and path of markdown files to load
 */
export declare const fetchSketchesFileData: () => Promise<{
    path: string;
}[]>;
