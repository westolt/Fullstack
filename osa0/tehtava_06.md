```mermaid
sequenceDiagram
    participant JavaScript
    participant server

    JavaScript->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>JavaScript: json data
    deactivate server

    Note right of JavaScript: Updates the page without reloading the page
```