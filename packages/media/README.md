# Optimize Images

Use this script to optimize images.

Before you can use the script, you have to install [sharp](https://sharp.pixelplumbing.com/install):

```sh
 pnpm i sharp got
```

This script is adapted from examples in the `sharp` documentation.

Modify the script to fit your needs (images sources, sizes, media queries...).

Then run:

```sh
 node ./sharp.js > out/images/path/to/fileName.json
```

The output will contain the optimized image source set with a json file of image source data.

## Known Issues

The script can only handle one image at a time (= a singleton array)
