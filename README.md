# waifu-list-frontend
This is the front end for my waifu list. It's supposed to display the list just like in the previous version's back end, but now using React. However, the back end is hosted without an SSL certificate, and all front end hosting services reroute HTTP requests to HTTPS. As such, the hosted version doesn't fully work, but rest assured, the local deployment does. 

## Getting Started
To get started locally, clone the repo and install the necessary dependencies (React, Axiom). Then:
1. Message me for the .env file. It exposes the Supabase bucket which I use to store all the waifu images, so I didn't want to include it here.
2. npm start

### Prerequisites
```
node@16.15.0
@testing-library/jest-dom@5.16.5
@testing-library/react@13.4.0
@testing-library/user-event@13.5.0
axios@1.1.2
react-dom@18.2.0
react-scripts@5.0.1
react@18.2.0
web-vitals@2.1.4
```

## Built With
### ReactJS
Basically, I converted all the direct database calls from my previous project to Axiom REST API calls to my back end. Then, I saved the results to a React state and rendered it as a component. 

### Supabase
I'm not using the Supabase package directly here, but instead just loading the images stored in a bucket from the public url. 

### AWS Amplify
I've tried Firebase, Vercel, and AWS Amplify. It seems that HTTPS rerouting is an industry standard now for front end hosting services. What a pain.

## To Do
### State Management w/ Redux
If I ever decide to expand my waifu list web app here into something larger, I'll utilize Redux in order to properly manage all the different React states.

## License
This project is licensed under the MIT License - see the <a href="https://github.com/Chubbyman2/waifu-list-frontend/blob/main/LICENSE">LICENSE</a> file for details.
