````markdown
# Garcho Chat Widget

Garcho is a customizable chatbot widget that can be easily integrated into your web application. This document provides instructions for development, building the widget, and integrating it into your application.

## Development

To start the development server, run the following command:

```bash
npm run start
```
````

## Building the Widget

To build the widget, run the following command:

```bash
npm run build:widget
```

This will compile the widget using Parcel and generate the necessary files for deployment.

Locate the build css/javascript inside dist directory.

## Integration

To add the Garcho widget to your web application, include the following code in your HTML. Make sure to load the widget script and styles after the initial page load to avoid slowing down the main content.

```html
<div
  id="Garcho"
  data-agent-id="2"
  data-web-token="DyTmbaDmUrfxAF3DCwgF8rCabG6dowJs5HWFJcqtb80"
  data-garcho-conf='{
            "title": "Garcho",
            "subtitle": "Customisable chatbot",
            "senderPlaceHolder": "Type a message...",
            "showCloseButton": true,
            "fullScreenMode": false,
            "autofocus": true,
            "chatId": "rcw-chat-container",
            "launcherOpenLabel": "Open chat",
            "launcherCloseLabel": "Close chat",
            "launcherOpenImg": "chat.svg",
            "launcherCloseImg": "",
            "sendButtonAlt": "Send",
            "showTimeStamp": true,
            "imagePreview": false,
            "zoomStep": 80,
            "showBadge": true,
            "styles": {
                "clientMessageText": " background-image: linear-gradient(135deg, rgba(42, 39, 218, 0.72) 0%, rgba(0, 204, 255, 0.72) 100%); color: white;",
                "responseMessageText": " background-color: rgb(240, 242, 247); color: black;",
                "header": " background-image: linear-gradient(135deg, rgba(42, 39, 218, 0.72) 0%, rgba(0, 204, 255, 0.72) 100%);",
                "closeButton": "background-color: #2563EB;",
                "launcher": " background-image: linear-gradient(135deg, rgba(42, 39, 218, 0.72) 0%, rgba(0, 204, 255, 0.72) 100%);",
                "container": "background-color: white",
                "sender": " background-color: white; color: black"
            }
        }'
  data-message="Hello! How can I help you today?"
></div>

<script>
  window.addEventListener("load", () => {
    const script = document.createElement("script");
    script.src = "path/to/your/widget.js";
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "path/to/your/widget.css";
    document.head.appendChild(link);
  });
</script>
```

Replace `'path/to/your/widget.js'` and `'path/to/your/widget.css'` with the actual paths to your built widget script and stylesheet.

This setup ensures that the widget script and styles are loaded after the initial page load, preventing any slowdown of the main content.
