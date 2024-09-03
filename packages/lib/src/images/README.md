# Optimize Images

To optimize images, modify the script to fit your needs (images sources, sizes, media queries...).
Then run:

```sh
 node ./sharp.js > out/images/path/to/fileName.json
```

The output will contain the optimized image source set with a json file of image source data.

## Known Issues

The script can only handle one image at a time (= a singleton array)
