# JsonSelectorV2
A spiritual successor to JSON-Selector-Generator by JoeQuery: https://github.com/joequery/JSON-Selector-Generator

## What is it? ##
A simple GUI for generating selectors used to access JSON data...with a few new features.
You can try it here:

https://d8ahazard.github.io/JsonSelectorV2/

## How does it work? ##
1. Download the project.
2. Load up index.html in a browser.
3. Paste in some JSON, click "PROCESS".
4. Click on any value in the dataset to view the selector.

## Why is this "V2"? ##
The original project was amazing. Literally...I use it almost every day when I was developing.

Unfortunately, the site appears to have gone down, and there were a few things I wanted to be able to do better:

1. I added double-click to copy any value within the array. If it's a string/number, that value will be copied.
If it's a sub-array, it will be copied in JSON format.

2. You can also double-click the whole table to copy the entire original JSON array.

3. Double-click the selector to copy it...

4. You can submit JSON to the page via a GET query, versus POST.

5. No server-side processing. The original app would POST data to a server.
This makes things faster, decreases server overhead, and removes limitations on data sizes.

6. A touch of bootstrap love to make it pretty.

7. Added a cookie to save your processed data, so it'll be present when you re-open the page (expires in 1 day).

