#!/bin/sh

version=$(cat manifest.json| json version)
fileName=year-progress-tab-${version}.zip
echo $fileName

rm -rf ${fileName}

zip ${fileName} bg.jpg icon16.png icon48.png icon128.png manifest.json moment.js page.html README.md script.js
