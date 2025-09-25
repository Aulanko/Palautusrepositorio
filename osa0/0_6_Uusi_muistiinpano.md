

```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Goes to the single app website

   

    
   
    
   
   

  
    
   
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML file/document

    deactivate server


    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server    

    Note right of browser: The browser executes the callback function that renders the notes saved

    user->>browser: Types something into the input field
    user->>browser: Clicks the "Save" button

 
    Note right of browser: The data from the input field is saved to the browser cache and the State of the application is updated

