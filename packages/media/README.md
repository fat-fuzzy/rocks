# Optimize Images

Use this script to optimize images.

Before you can use the script, you have to install [sharp](https://sharp.pixelplumbing.com/install):

```sh
 pnpm i sharp got
```

This script is adapted from examples in the `sharp` documentation.

Modify the script to fit your needs (images sources, sizes, media queries...).

Add the image you wish to resize to `apps/doc/static/${path-to-image}` and launch the app in dev mode.

Then run:

```sh
 node src/sharp.js > out/images/path-to/fileName.json
```

The output will contain the optimized image source set with a json file of image source data.

Move the json file to `apps/doc/src/assets/${path-to-image}` and the generated images to  `apps/doc/static/${path-to-image}`.

You can augment the generated json with the following data, and it will be used in the rendering of the image if you use an `Image` of `Picture` component from the `@fat-fuzzy/ui` library:

- "alt" to add a suitable description for the image
- "style" to apply specific styles such as filters or other CSS rules
- "title" that will be used if the image is displayed in the `media` web page
- "description" (must be different from "alt") that will be used if the image is displayed in the `media` web page

You should now be able to load the images into a web page in `apps/doc` by using the `id` prop from the json file.

## Known Issues

The script can only handle one image at a time (= a singleton array)

## TODO

- improve image sizing and compression rates
- use rem units for media queries
