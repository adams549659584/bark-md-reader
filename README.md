# Bark Markdown Reader

## Instructions

> if you see here, the url params may be wrong !

> id is required

## Use

```sh
curl -X "POST" "http://127.0.0.1:8080/push" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "device_key": "your key",
  "title": "bleem",
  "body": "Test Bark Server",
  "badge": 1,
  "category": "category",
  "sound": "minuet.caf",
  "icon": "https://day.app/assets/images/avatar.jpg",
  "group": "test",
  "markdown": "# markdown text \n > will replace url"
}'
```