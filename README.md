# Bark Markdown Reader

仅支持简单 markdown 语法，如需复杂语法，请自行配置 markdown-it 进行扩展

## Instructions

> if you see here, the url params may be wrong !

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
  "markdown": "# markdown title \\n > markdown text"
}'
```