const discord = require("discord.js");
const intents = new discord.IntentsBitField(3276799);
const client = new discord.Client({ intents });
const loadCommands = require("./Loader/loadCommands");
const loadEvents = require("./Loader/loadEvents");
const { token } = require("./config.json");
const { EmbedBuilder } = require("discord.js");

client.commands = new discord.Collection();

client.login(token);
loadCommands(client);
loadEvents(client);

const fetchTopBassHousePlaylist = async () => {
  //Ask for token to Spotify API to get the top 10 songs of the Bass House playlist
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `03d9385f80d44791b669e5edf0c8c526:12e8811ebb2a4b6da02483047f9b5877`
      ).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  const accessToken = data.access_token;

  //Get the top 10 songs of the Bass House playlist
  const res = await fetch(
    "https://api.spotify.com/v1/playlists/37i9dQZF1EIhb7w4T6EHP7",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const bassHousePlaylist = await res.json();
  // Sort the tracks by popularity
  const sortedTracks = bassHousePlaylist.tracks.items.sort(
    (a, b) => b.popularity - a.popularity
  );
  const formatTrackList = (trackList) => {
    const formattedList = trackList
      .map((track, index) => {
        const artists = track.track.artists
          .map((artist) => artist.name)
          .join(", ");
        const imageUrl = track.track.album.images[0].url; // Ajouter l'URL de l'image
        return `${index + 1}. **[${track.track.name}](${
          track.track.external_urls.spotify
        })** - ${artists} [[Track image here](${imageUrl})]`;
      })
      .join("\n");
    return formattedList;
  };

  // Get the top 10 tracks by popularity
  const top10TracksFormated = await formatTrackList(sortedTracks.slice(0, 11));
  // Format the list of tracks
  const bassHouseChannel = client.channels.cache.find(
    (channel) => channel.name === "bass-house"
  );
  if (!bassHouseChannel) return console.error("Channel not found");

  const firstTrackPicture = sortedTracks[0].track.album.images[0].url;
  // Create the message embed
  const embed = new EmbedBuilder()
    .setColor("#1DB954")
    .setTitle("Top 10 Bass House Songs on Spotify")
    .setDescription(top10TracksFormated)
    .setImage(firstTrackPicture)
    .setTimestamp();

  // Send the message
  bassHouseChannel.send({ embeds: [embed] });
};
// Envoyer le top 10 une fois par jour
const intervalMs = 5 * 1000; // 4 secondes
//const intervalMs = 24 * 60 * 60 * 1000; // 24 heures
setInterval(fetchTopBassHousePlaylist, intervalMs);
//fetchTopBassHousePlaylist();
