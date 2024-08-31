#Spotify Clone 🎵
Welcome to my Spotify Clone project! This repository showcases my front-end development skills through a carefully crafted clone of the Spotify web interface, enhanced with innovative features that extend beyond the original design.

#🚀 Project Overview
This project is a functional clone of the Spotify website, designed to demonstrate a keen eye for UI/UX design and proficiency in web development technologies. Beyond simply replicating Spotify's aesthetic, I've implemented dynamic features that provide a richer user experience.

#🌟 Key Features
Dynamic Playlist Creation: Playlists are generated dynamically, each containing an album cover image, an info.json file with metadata, and all associated songs.

Interactive Library: Users can click on playlists to load songs into the library, enabling seamless navigation and music exploration.

Responsive Design: The interface is fully responsive, ensuring an optimal experience across all devices, from desktops to mobile screens.

Custom Playbar: A playbar appears only when a song is selected, mimicking the Spotify experience and conserving screen real estate when idle.

Smooth Animations: Subtle animations enhance the visual appeal and interactivity, providing a polished, professional feel.

#🛠️ Technologies Used
HTML5: For structuring the content.
CSS3: For styling, including advanced layout techniques like Flexbox and Grid.
JavaScript (ES6+): For interactivity and dynamic content generation.
Fetch API: For loading playlists and songs dynamically from the server.
#📂 Project Structure
index.html: The main entry point of the application.
script.js: Handles all JavaScript functionalities, including dynamic playlist loading, song playing, and UI interactions.
/css: Contains the stylesheet managing the overall look and feel.
/images: Contains icons and album covers used in the interface.
/songs: Each subfolder represents a playlist containing:
cover.jpeg: The album cover image.
info.json: Metadata about the playlist (e.g., title, description).
*.mp3: The audio files of the songs.
#⚙️ Setup Instructions
Ensure that the base URL in script.js points to your local server's path to the songs folder. This is necessary for dynamically loading playlists and songs.

javascript
Copy code
async function displayAlbums(baseUrl = `http://localhost:8000/songs/`) {
    // Adjust the baseUrl to match your server's configuration
}
#🎯 Objectives
The goal of this project was to:

Replicate Spotify's UI to demonstrate advanced CSS and JavaScript skills.
Implement dynamic features that enhance the user experience.
Create a project that is both visually appealing and functionally robust.

#📝 License
This project is licensed under the Apache 2.0 License. See the LICENSE file for details.
